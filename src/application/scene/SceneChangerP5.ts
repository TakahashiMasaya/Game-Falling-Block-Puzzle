/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import p5 from 'p5';
import { Scene, Image, Text } from '@/type/Scene';
import { InteractiveController } from '@/interactor/InteractiveController';

export class SceneChangerP5 {
  private list: Scene[];

  private canvasElement: HTMLElement | null = null;

  private interactiveController: InteractiveController;

  constructor({
    list,
    canvasElement,
    interactiveController,
  }: {
    list: Scene[],
    canvasElement: HTMLElement | null,
    interactiveController: InteractiveController,
  }) {
    this.list = list;
    this.canvasElement = canvasElement;
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
    let s: any = scene.next().value;

    const up = p.createButton('UP');
    up.position(68, 500);
    const left = p.createButton('LEFT');
    left.position(20, 540);
    const right = p.createButton('RIGHT');
    right.position(100, 540);
    const down = p.createButton('DOWN');
    down.position(58, 580);

    const spinLeft = p.createButton('SPINLEFT');
    spinLeft.position(180, 520);
    const spinRight = p.createButton('SPINRIGHT');
    spinRight.position(270, 520);

    const enter = p.createButton('ENTER');
    enter.position(230, 560);

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);

      up.touchStarted(this.interactiveController.up);
      up.touchEnded(this.interactiveController.offUp);
      left.touchStarted(this.interactiveController.left);
      left.touchEnded(this.interactiveController.offLeft);
      right.touchStarted(this.interactiveController.right);
      right.touchEnded(this.interactiveController.offRight);
      down.touchStarted(this.interactiveController.down);
      down.touchEnded(this.interactiveController.offDown);
      spinLeft.touchStarted(this.interactiveController.spinLeft);
      spinLeft.touchEnded(this.interactiveController.offSpinLeft);
      spinRight.touchStarted(this.interactiveController.spinRight);
      spinRight.touchEnded(this.interactiveController.offSpinRight);
      enter.touchStarted(this.interactiveController.enter);
      enter.touchEnded(this.interactiveController.offEnter);
    };
    p.keyPressed = () => {
      switch (p.keyCode) {
        case p.UP_ARROW:
          this.interactiveController.up();
          break;
        case p.LEFT_ARROW:
          this.interactiveController.left();
          break;
        case p.RIGHT_ARROW:
          this.interactiveController.right();
          break;
        case p.DOWN_ARROW:
          this.interactiveController.down();
          break;
        case 90: // Z
          this.interactiveController.spinLeft();
          break;
        case 88: // X
          this.interactiveController.spinRight();
          break;
        case 32: // Space
          this.interactiveController.enter();
          break;
        default:
      }
      return false;
    };
    p.keyReleased = () => {
      switch (p.keyCode) {
        case p.UP_ARROW:
          this.interactiveController.offUp();
          break;
        case p.LEFT_ARROW:
          this.interactiveController.offLeft();
          break;
        case p.RIGHT_ARROW:
          this.interactiveController.offRight();
          break;
        case p.DOWN_ARROW:
          this.interactiveController.offDown();
          break;
        case 90: // Z
          this.interactiveController.offSpinLeft();
          break;
        case 88: // X
          this.interactiveController.offSpinRight();
          break;
        case 32: // Space
          this.interactiveController.offEnter();
          break;
        default:
      }
      return false;
    };
    p.draw = () => {
      p.background('#0f2350');
      p.noStroke();
      p.fill(255);
      // el.touchStarted((e: any) => console.log(e));
      s.move();

      s.draw().forEach((v: any) => {
        const { type } = v;
        switch (type) {
          case 'text': {
            const {
              size, position, value, fill,
            }: Text = v;
            const pos = (typeof position === 'string') ? {
              x: p.windowWidth / 2,
              y: (p.windowHeight / 2) - (size / 2),
            } : position;
            p.textAlign('center');
            p.textSize(size);
            if ((fill ?? true) !== true) p.fill(fill as any);
            p.text(value as any, pos.x, pos.y);
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
            if ((stroke ?? true) !== true) p.stroke(stroke?.toString() || '');
            if ((fill ?? true) !== true) p.fill(fill?.toString() || '');
            p.rect(x, y, width, height);
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
  };

  public start = () => {
    new p5(this.sketch, this.canvasElement || undefined);
  }
}
