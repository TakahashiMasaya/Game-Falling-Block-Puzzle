/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import p5 from 'p5';
import { Scene, Image, Text } from '@/type/Scene';
import { paramSetAction, TBtPositions, TBtIndex } from '@/type/Controllers';
import { InteractiveController } from '@/application/interactor/InteractiveController';
import { TransferredScreen } from '@/application/application/TransferredScreen';
import { PC } from '@/application/controllers/p5/PC';
import { SP } from '@/application/controllers/p5/SP';
import { P5 } from '@/application/presenters/screen/P5';

export class SceneChangerP5 {
  private list: Scene[];

  private insertButtonsElement: HTMLElement | null = null;

  private canvasElement: HTMLElement | null = null;

  private interactiveController: InteractiveController;

  private isPlaying: boolean = false;

  private transferredScreen: TransferredScreen | null = null;

  private p5Remove: any = null;

  private p5: p5 | null = null;

  constructor({
    list,
    insertButtonsElement,
    canvasElement,
    interactiveController,
  }: {
    list: Scene[],
    insertButtonsElement: HTMLElement | null,
    canvasElement: HTMLElement | null,
    interactiveController: InteractiveController,
  }) {
    this.list = list;
    this.canvasElement = canvasElement;
    this.insertButtonsElement = insertButtonsElement;
    this.interactiveController = interactiveController;
  }

  * sceneList() {
    yield this.list[0];
    yield this.list[1];
    yield this.list[2];
  }

  private sketch = (p: p5) => {
    let scene = this.sceneList();
    // TODO: Scene | void voidにしない方法が見つからない
    this.interactiveController.reset();
    let s: any = scene.next().value;

    this.transferredScreen = new TransferredScreen({
      window: {
        width: p.windowWidth,
        height: p.windowHeight,
      },
      screen: {
        width: 400,
        height: 600,
      },
      horizonalAlign: 'center',
      verticalAlign: 'center',
    });
    const buttons = new P5({ p, parent: this.insertButtonsElement });
    const pc = new PC(p);
    const sp = new SP(p);

    const btPositions = {
      up: {
        x: 80, y: 450, width: 50, height: 50,
      },
      left: {
        x: 40, y: 490, width: 50, height: 50,
      },
      right: {
        x: 120, y: 490, width: 50, height: 50,
      },
      down: {
        x: 80, y: 530, width: 50, height: 50,
      },
      spinLeft: {
        x: 220, y: 470, width: 50, height: 50,
      },
      spinRight: {
        x: 310, y: 470, width: 50, height: 50,
      },
      enter: {
        x: 265, y: 510, width: 50, height: 50,
      },
    };

    const resizeButtons = () => {
      const adjustButtons: TBtPositions = Object.keys(btPositions)
        .reduce<TBtPositions>((ar: TBtPositions, cu: string) => {
          const {
            x: px, y: py, width: pw, height: ph,
          } = btPositions[cu as TBtIndex];
          const {
            x, y, width, height,
          } = this.transferredScreen?.transfer({
            x: px,
            y: py,
            width: pw,
            height: ph,
          }) || {
            x: 0, y: 0, width: 0, height: 0,
          };
          return {
            ...ar,
            [cu]: {
              x, y, width, height,
            },
          };
        }, btPositions);
      buttons.adjustButtons(adjustButtons);
    };

    const draw = () => {
      p.background('#0f2350');
      p.noStroke();
      p.fill(255);
      s.move();

      s.draw().forEach((v: any) => {
        const { type } = v;
        switch (type) {
          case 'text': {
            const {
              width, height, position, value, fill,
            }: Text = v;
            const pos = (typeof position === 'string') ? {
              x: 400 / 2,
              y: (600 / 2) - (height / 2),
              width,
              height,
            } : position;

            const {
              x: tx, y: ty, width: tw,
            } = this.transferredScreen?.transfer({
              x: pos.x, y: pos.y, width, height,
            }) || {
              x: 0, y: 0, width: 0, height: 0,
            };
            p.textAlign('center');
            p.textSize(tw);
            if ((fill ?? true) !== true) p.fill(fill as any);
            p.text(value as any, tx, ty);
            break;
          }
          case 'image': {
            const {
              position, width, height, stroke, fill,
            }: Image = v;
            if (typeof position === 'string') {
              return;
            }
            const {
              x, y,
            } = position;
            const {
              x: tx, y: ty, width: tw, height: th,
            } = this.transferredScreen?.transfer({
              x, y, width, height,
            }) || {
              x: 0, y: 0, width: 0, height: 0,
            };
            if ((stroke ?? true) !== true) p.stroke(stroke?.toString() || '');
            if ((fill ?? true) !== true) p.fill(fill?.toString() || '');
            p.rect(tx, ty, tw, th);
            break;
          }
          default:
        }
      });

      if (s.isEnd()) {
        s = scene.next().value;
      }
      if (!s) {
        // 最初に戻り再開する
        scene = this.sceneList();
        s = scene.next().value;
      }
    };

    const resizeWindow = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      this.transferredScreen?.resizeWindow({
        width: p.windowWidth,
        height: p.windowHeight,
      });
      draw();
      resizeButtons();
    };

    const action: paramSetAction = {
      action: {
        up: this.interactiveController.up,
        down: this.interactiveController.down,
        left: this.interactiveController.left,
        right: this.interactiveController.right,
        spinRight: this.interactiveController.spinRight,
        spinLeft: this.interactiveController.spinLeft,
        enter: this.interactiveController.enter,
        offUp: this.interactiveController.offUp,
        offDown: this.interactiveController.offDown,
        offLeft: this.interactiveController.offLeft,
        offRight: this.interactiveController.offRight,
        offSpinRight: this.interactiveController.offSpinRight,
        offSpinLeft: this.interactiveController.offSpinLeft,
        offEnter: () => {
          this.interactiveController.offEnter();
          resizeWindow();
          if (s.constructor.name !== 'ScenePlaying') { return; }
          if (this.isPlaying) {
            p.noLoop();
            this.isPlaying = false;
          } else {
            p.loop();
            this.isPlaying = true;
          }
        },
      },
    };

    pc.setAction({
      ...action,
    });
    sp.setAction({
      buttons: buttons.getButtons(),
      ...action,
    });

    // ウィンドウリサイズを定義
    p.windowResized = () => resizeWindow();

    // TODO: ボタン系は暫定
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      resizeButtons();
    };

    this.p5Remove = p.remove;

    p.draw = () => { draw(); };
  };

  /**
   * p5インスタンス生成
   *
   * @memberof SceneChangerP5
   */
  public start = () => {
    this.p5 = new p5(this.sketch, this.canvasElement || undefined);
  };

  /**
   * p5を削除する
   *
   * @memberof SceneChangerP5
   */
  public remove = () => {
    this.p5Remove();
  };
}
