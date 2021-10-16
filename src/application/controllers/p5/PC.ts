import p5 from 'p5';
import { Controller } from '@/application/controllers/Controller';
import { paramSetAction } from '@/type/Controllers';

export class PC implements Controller {
  private p5: p5;

  constructor(p: p5) {
    if (!p) {
      throw new Error('param p does not exist!');
    }
    this.p5 = p;
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
    this.p5.keyPressed = () => {
      switch (this.p5.keyCode) {
        case this.p5.UP_ARROW:
          up();
          break;
        case this.p5.LEFT_ARROW:
          left();
          break;
        case this.p5.RIGHT_ARROW:
          right();
          break;
        case this.p5.DOWN_ARROW:
          down();
          break;
        case 90: // Z
          spinLeft();
          break;
        case 88: // X
          spinRight();
          break;
        case 32: // Space
          enter();
          break;
        default:
      }
      return false;
    };

    this.p5.keyReleased = () => {
      switch (this.p5.keyCode) {
        case this.p5.UP_ARROW:
          offUp();
          break;
        case this.p5.LEFT_ARROW:
          offLeft();
          break;
        case this.p5.RIGHT_ARROW:
          offRight();
          break;
        case this.p5.DOWN_ARROW:
          offDown();
          break;
        case 90: // Z
          offSpinLeft();
          break;
        case 88: // X
          offSpinRight();
          break;
        case 32: // Space
          offEnter();
          break;
        default:
      }
      return false;
    };
  }
}
