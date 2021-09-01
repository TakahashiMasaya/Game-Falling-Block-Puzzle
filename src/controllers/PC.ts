import { Controller } from '@/controllers/Controller';
import { paramSetAction } from '@/type/Controllers';

export class PC implements Controller {
  public setAction = ({
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
  }: paramSetAction) => {
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

    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          offUp();
          break;
        case 'ArrowRight':
        case 'Right':
          offRight();
          break;
        case 'ArrowDown':
        case 'Down':
          offDown();
          break;
        case 'ArrowLeft':
        case 'Left':
          offLeft();
          break;

        case 'z':
        case 'Z':
          offSpinLeft();
          break;
        case 'x':
        case 'X':
          offSpinRight();
          break;

        case ' ':
        case 'Spacebar':
          offEnter();
          break;
        default:
      }
      return false;
    }, false);
  }
}
