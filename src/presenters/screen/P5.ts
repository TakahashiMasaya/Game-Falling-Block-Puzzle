import p5 from 'p5';
import { Buttons } from '@/type/Presenters';
import { TBtPositions } from '@/type/Controllers';

export class P5 {
  private p5: p5;

  private buttons: Buttons;

  constructor(p: p5) {
    if (!p) {
      throw new Error('param p does not exist!');
    }
    this.p5 = p;
    this.buttons = {
      up: p.createDiv(''),
      left: p.createDiv(''),
      right: p.createDiv(''),
      down: p.createDiv(''),
      spinLeft: p.createDiv(''),
      spinRight: p.createDiv(''),
      enter: p.createDiv(''),
    };
    this.styledButtons();
  }

  private styledButtons = () => {
    Object.keys(this.buttons).forEach((button) => {
      const bt = this.buttons[button as keyof Buttons];
      bt.style('color', '#cccccc');
      bt.style('display', 'block');
      bt.style('overflow', 'hidden');
      bt.style('font-size', '30px');
      bt.style('width', '70px');
      bt.style('height', '70px');
      bt.style('border-radius', '50%');
      bt.style('background', 'linear-gradient(45deg, rgb(37, 37, 37) 0%, rgb(49, 49, 49) 35%, rgb(167, 167, 167) 100%)');
      bt.style('border', '4px solid #aaaaaa');
    });
  }

  public getButtons = (): Buttons => this.buttons;

  public adjustButtons = (_p: TBtPositions) => {
    Object.keys(this.buttons).forEach((button) => {
      const {
        x, y, width, height,
      } = _p[button as keyof TBtPositions];
      const bt = this.buttons[button as keyof Buttons];
      bt.position(x, y);
      bt.style('width', width);
      bt.style('height', height);
    });
  }
}
