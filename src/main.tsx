import { InteractiveController } from '@/interactor/InteractiveController';
import { paramSetAction } from './type/Controllers';
import { PC } from '@/controllers/PC';
import { SP } from '@/controllers/SP';

import { SceneChangerP5 } from './application/scene/SceneChangerP5';
import { SceneStart } from './application/scene/SceneStart';
import { ScenePlaying } from './application/scene/ScenePlaying';
import { SceneGameover } from './application/scene/SceneGameover';

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

const s1 = new SceneStart({
  interactiveController: ic,
  interactivePresenter: null,
});
const s2 = new ScenePlaying({
  interactiveController: ic,
  interactivePresenter: null,
});
const s3 = new SceneGameover({
  interactiveController: ic,
  interactivePresenter: null,
});

const sc = new SceneChangerP5({
  list: [s1, s2, s3],
  canvasElement: document.querySelector('.canvas-wrapper'),
});
sc.start();
