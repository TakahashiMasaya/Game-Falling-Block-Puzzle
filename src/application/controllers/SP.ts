import { Controller } from '@/application/controllers/Controller';
import { paramSetAction } from '@/type/Controllers';

export class SP implements Controller {
  public setAction = ({
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
    document.querySelector('.up')?.addEventListener('touchenter', () => up(), false);
    document.querySelector('.up')?.addEventListener('touchmove', () => up(), false);
    document.querySelector('.up')?.addEventListener('touchend', () => offUp(), false);
    document.querySelector('.right')?.addEventListener('touchenter', right, false);
    document.querySelector('.right')?.addEventListener('touchmove', right, false);
    document.querySelector('.right')?.addEventListener('touchend', offRight, false);
    document.querySelector('.left')?.addEventListener('touchenter', left, false);
    document.querySelector('.left')?.addEventListener('touchmove', left, false);
    document.querySelector('.left')?.addEventListener('touchend', offLeft, false);
    document.querySelector('.down')?.addEventListener('touchenter', down, false);
    document.querySelector('.down')?.addEventListener('touchmove', down, false);
    document.querySelector('.down')?.addEventListener('touchend', offDown, false);

    document.querySelector('.spinLeft')?.addEventListener('touchenter', spinLeft, false);
    document.querySelector('.spinLeft')?.addEventListener('touchmove', spinLeft, false);
    document.querySelector('.spinLeft')?.addEventListener('touchend', offSpinLeft, false);

    document.querySelector('.spinRight')?.addEventListener('touchenter', spinRight, false);
    document.querySelector('.spinRight')?.addEventListener('touchmove', spinRight, false);
    document.querySelector('.spinRight')?.addEventListener('touchend', offSpinRight, false);

    document.querySelector('.enter')?.addEventListener('touchenter', enter, false);
    document.querySelector('.enter')?.addEventListener('touchmove', enter, false);
    document.querySelector('.enter')?.addEventListener('touchend', offEnter, false);
  }
}
