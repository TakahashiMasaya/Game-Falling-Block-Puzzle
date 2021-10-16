import p5 from 'p5';
import { paramSetAction } from '@/type/Controllers';
import { Controller } from '@/application/controllers/Controller';

export class SP implements Controller {
  private p5: p5;

  constructor(p: p5) {
    if (!p) {
      throw new Error('param p does not exist!');
    }
    this.p5 = p;
  }

  /**
   * ボタンにアクションを紐付ける
   *
   * @param {paramSetAction} {
   *     buttons,
   *     action: {
   *       up,
   *       right,
   *       down,
   *       left,
   *       spinLeft,
   *       spinRight,
   *       enter,
   *       offUp,
   *       offRight,
   *       offDown,
   *       offLeft,
   *       offSpinLeft,
   *       offSpinRight,
   *       offEnter,
   *     },
   *   }
   * @memberof SP
   */
  public setAction = ({
    buttons,
    action: {
      up,
      right,
      down,
      left,
      spinLeft,
      spinRight,
      enter,
      offUp,
      offRight,
      offDown,
      offLeft,
      offSpinLeft,
      offSpinRight,
      offEnter,
    },
  }: paramSetAction) => {
    buttons?.up.touchStarted(up);
    buttons?.up.touchEnded(offUp);
    buttons?.left.touchStarted(left);
    buttons?.left.touchEnded(offLeft);
    buttons?.right.touchStarted(right);
    buttons?.right.touchEnded(offRight);
    buttons?.down.touchStarted(down);
    buttons?.down.touchEnded(offDown);
    buttons?.spinLeft.touchStarted(spinLeft);
    buttons?.spinLeft.touchEnded(offSpinLeft);
    buttons?.spinRight.touchStarted(spinRight);
    buttons?.spinRight.touchEnded(offSpinRight);
    buttons?.enter.touchStarted(enter);
    buttons?.enter.touchEnded(offEnter);
  }
}
