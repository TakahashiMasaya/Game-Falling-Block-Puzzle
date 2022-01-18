import { Controller } from '@/application/controllers/Controller';
import { paramSetAction } from '@/type/Controllers';
import { TFocussedButtons } from '@/type/Presenters';

export class SP implements Controller {
  private focussedButtons: TFocussedButtons;

  constructor({
    focussedButtons,
  }: {
    focussedButtons: TFocussedButtons
  }) {
    this.focussedButtons = focussedButtons;
  }

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
    document.addEventListener('touchstart', (e) => {
      const buttons = this.focussedButtons({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
      buttons?.forEach((button) => {
        switch (button) {
          case 'up':
            up();
            break;
          case 'down':
            down();
            break;
          case 'left':
            left();
            break;
          case 'right':
            right();
            break;
          case 'spinRight':
            spinRight();
            break;
          case 'spinLeft':
            spinLeft();
            break;
          case 'enter':
            enter();
            break;
          default:
        }
      });
    });
    document.addEventListener('touchend', () => {
      // from -1 to 1
      offUp();
      offDown();
      offLeft();
      offRight();
      offSpinRight();
      offSpinLeft();
      offEnter();
    });
  };
}
