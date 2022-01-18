import { Controller } from '@/application/controllers/Controller';
import { paramSetAction } from '@/type/Controllers';
import { TFocussedButtons } from '@/type/Presenters';

export class PC implements Controller {
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
    document.addEventListener('mousedown', (e) => {
      const buttons = this.focussedButtons({
        x: e.clientX,
        y: e.clientY,
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
    document.addEventListener('mouseup', () => {
      offUp();
      offDown();
      offLeft();
      offRight();
      offSpinRight();
      offSpinLeft();
      offEnter();
    });

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          up();
          break;
        case 'ArrowRight':
        case 'Right':
          right();
          break;
        case 'ArrowDown':
        case 'Down':
          down();
          break;
        case 'ArrowLeft':
        case 'Left':
          left();
          break;

        case 'z':
        case 'Z':
          spinLeft();
          break;
        case 'x':
        case 'X':
          spinRight();
          break;

        case ' ':
        case 'Spacebar':
          enter();
          break;
        default:
      }
      return false;
    }, false);

    document.addEventListener('keyup', () => {
      offUp();
      offRight();
      offDown();
      offLeft();
      offSpinLeft();
      offSpinRight();
      offEnter();
      return false;
    }, false);
  };
}
