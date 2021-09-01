import { paramSetAction } from '@/type/Controllers';

export interface Controller {
  setAction({
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
  }: paramSetAction): void;
}
