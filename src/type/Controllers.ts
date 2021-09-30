import { Buttons } from './Presenters';

export type paramSetAction = {
  buttons?: Buttons,
  action: {
    up: () => void;
    right: () => void;
    down: () => void;
    left: () => void;
    spinLeft: () => void;
    spinRight: () => void;
    enter: () => void;
    offUp: () => void;
    offRight: () => void;
    offDown: () => void;
    offLeft: () => void;
    offSpinLeft: () => void;
    offSpinRight: () => void;
    offEnter: () => void;
  };
};

export type TBtIndex = 'up' | 'right' | 'down' | 'left' | 'spinLeft' | 'spinRight' | 'enter';

export type TBtPositions = {
  [key in TBtIndex]: { x: number, y: number, width: number, height: number }
}
