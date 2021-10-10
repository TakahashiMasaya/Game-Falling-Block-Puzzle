import p5 from 'p5';
import { Buttons } from '@/type/Presenters';
import { TBtPositions } from '@/type/Controllers';

import up from '@/assets/buttons/up.svg';
import down from '@/assets/buttons/down.svg';
import right from '@/assets/buttons/right.svg';
import left from '@/assets/buttons/left.svg';
import spinLeft from '@/assets/buttons/spinLeft.svg';
import spinRight from '@/assets/buttons/spinRight.svg';
import enter from '@/assets/buttons/enter.svg';

export class P5 {
  private p5: p5;

  private buttons: Buttons;

  /**
   * Creates an instance of P5.
   * ボタンを生成する
   * @param {p5} p
   * @memberof P5
   */
  constructor(p: p5) {
    if (!p) {
      throw new Error('param p does not exist!');
    }
    this.p5 = p;
    this.buttons = {
      up: p.createDiv('').class('button up'),
      left: p.createDiv('').class('button left'),
      right: p.createDiv('').class('button right'),
      down: p.createDiv('').class('button down'),
      spinLeft: p.createDiv('').class('button spinLeft'),
      spinRight: p.createDiv('').class('button spinRight'),
      enter: p.createDiv('').class('button enter'),
    };
    this.styledButtons();
  }

  /**
   * ボタンをstyle設定する
   *
   * @private
   * @memberof P5
   */
  private styledButtons = () => {
    Object.keys(this.buttons).forEach((button) => {
      const bt = this.buttons[button as keyof Buttons];
      const linearGradient = 'linear-gradient(45deg, rgb(37, 37, 37) 0%, rgb(49, 49, 49) 35%, rgb(167, 167, 167) 100%)';
      switch (button) {
        case 'up':
          bt.style('background', `url(${up}), ${linearGradient}`);
          break;
        case 'down':
          bt.style('background', `url(${down}), ${linearGradient}`);
          break;
        case 'right':
          bt.style('background', `url(${right}), ${linearGradient}`);
          break;
        case 'left':
          bt.style('background', `url(${left}), ${linearGradient}`);
          break;
        case 'spinLeft':
          bt.style('background', `url(${spinLeft}), ${linearGradient}`);
          break;
        case 'spinRight':
          bt.style('background', `url(${spinRight}), ${linearGradient}`);
          break;
        case 'enter':
          bt.style('background', `url(${enter}), ${linearGradient}`);
          break;
        default:
          bt.style('background', `${linearGradient}`);
      }
      bt.style('color', '#cccccc');
      bt.style('display', 'block');
      bt.style('overflow', 'hidden');
      bt.style('font-size', '30px');
      bt.style('width', '70px');
      bt.style('height', '70px');
      bt.style('border-radius', '50%');
      bt.style('border', '7px solid #aaaaaa');
      bt.style('cursor', 'pointer');
    });
  }

  /**
   * ボタンを一式取得する
   *
   * @memberof P5
   */
  public getButtons = (): Buttons => this.buttons;

  /**
   * ボタンの位置、サイズを調整する
   *
   * @param {TBtPositions} _p
   * @memberof P5
   */
  public adjustButtons = (_p: TBtPositions) => {
    Object.keys(this.buttons).forEach((button) => {
      const {
        x, y, width, height,
      } = _p[button as keyof TBtPositions];
      const bt = this.buttons[button as keyof Buttons];
      bt.position(x, y);
      bt.style('width', width);
      bt.style('height', height);
      bt.style('border-width', `${Math.trunc(width / 10)}px`);
    });
  }
}
