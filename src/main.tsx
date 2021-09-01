import { InteractiveController } from '@/interactor/InteractiveController';
import { paramSetAction } from './type/Controllers';
import { PC } from '@/controllers/PC';
import { SP } from '@/controllers/SP';

import './scss/index.scss';

const ic = new InteractiveController();
const pc = new PC();
const sp = new SP();

const action: paramSetAction = {
  up: ic.up,
  down: ic.down,
  left: ic.left,
  right: ic.right,
  spinRight: ic.spinRight,
  spinLeft: ic.spinLeft,
  enter: ic.enter,
  offUp: ic.offUp,
  offDown: ic.offDown,
  offLeft: ic.offLeft,
  offRight: ic.offRight,
  offSpinRight: ic.offSpinRight,
  offSpinLeft: ic.offSpinLeft,
  offEnter: ic.offEnter,
};

pc.setAction(action);
sp.setAction(action);
