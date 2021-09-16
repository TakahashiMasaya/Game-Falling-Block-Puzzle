/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import p5 from 'p5';
import { Scene, Image, Text } from '@/type/Scene';

export class SceneChangerP5 {
  private list: Scene[];

  private canvasElement: HTMLElement | null = null;

  constructor({
    list,
    canvasElement,
  }: {
    list: Scene[],
    canvasElement: HTMLElement | null,
  }) {
    this.list = list;
    this.canvasElement = canvasElement;
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
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = () => {
      p.background('#0f2350');
      p.noStroke();
      p.fill(255);
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
            if ((stroke ?? true) !== true) p.stroke(stroke as any);
            if ((fill ?? true) !== true) p.fill(fill as any);
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
