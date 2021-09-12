/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import p5 from 'p5/lib/p5.min';
import { Scene } from '@/type/Application';

import { Image, Text } from '@/type/Scene';

export class SceneChangerP5 {
  private list: any;

  private canvasElement: HTMLCanvasElement | null = null;

  constructor({
    list,
    canvasElement,
  }) {
    this.list = list;
    this.canvasElement = canvasElement || null;
  }

  * sceneList() {
    yield this.list[0];
    yield this.list[1];
    yield this.list[2];
  }

  private sketch = (p: p5) => {
    let scene = this.sceneList();
    let s: Scene = scene.next().value;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = () => {
      p.background('#0f2350');
      p.noStroke();
      p.fill(255);
      s.move();

      s.draw().forEach((v) => {
        const { type } = v;
        switch (type) {
          case 'text': {
            const { size, position, value }: Text = v;
            const pos = (typeof position === 'string') ? {
              x: p.windowWidth / 2,
              y: (p.windowHeight / 2) - (size / 2),
            } : position;
            p.textAlign('center');
            p.textSize(size);
            p.text(value, pos.x, pos.y);
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
            if ((stroke ?? true) !== true) p.stroke(stroke);
            if ((fill ?? true) !== true) p.fill(fill);
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
    new p5(this.sketch, this.canvasElement);
  }
}
