import p5 from 'p5';
import { Buttons } from '@/type/Presenters';
import { TBtPositions } from '@/type/Controllers';

import up from '@/application/assets/buttons/up.svg';
import down from '@/application/assets/buttons/down.svg';
import right from '@/application/assets/buttons/right.svg';
import left from '@/application/assets/buttons/left.svg';
import spinLeft from '@/application/assets/buttons/spinLeft.svg';
import spinRight from '@/application/assets/buttons/spinRight.svg';
import enter from '@/application/assets/buttons/enter.svg';

export class P5 {
  private p5: p5;

  private buttons: Buttons;

  /**
   * Creates an instance of P5.
   * ボタンを生成する
   * @param {({p: p5, parent: HTMLElement | null})} { p, parent }
   * @memberof P5
   */
  constructor({ p, parent }: {p: p5, parent: HTMLElement | null}) {
    if (!p) {
      throw new Error('param p does not exist!');
    }
    this.p5 = p;
    const setButton = (className: string) => (parent === null ? p.createDiv('').class(className) : p.createDiv('').class(className).parent(parent));
    this.buttons = {
      up: setButton('button up'),
      left: setButton('button left'),
      right: setButton('button right'),
      down: setButton('button down'),
      spinLeft: setButton('button spinLeft'),
      spinRight: setButton('button spinRight'),
      enter: setButton('button enter'),
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
  };

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
  };
}
