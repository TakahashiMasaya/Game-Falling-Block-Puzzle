import React, { useEffect } from 'react';
import { TransferredController } from '@/application/application/TransferredController';
import { InteractiveController } from '@/application/interactor/InteractiveController';

// TODO: 入力コントローラーの設定をp5用にする
// import { paramSetAction } from './type/Controllers';
// import { PC } from '@/application/controllers/PC';
// import { SP } from '@/application/controllers/SP';

import { SceneChangerP5 } from '@/application/application/scene/SceneChangerP5';
import { SceneStart } from '@/application/application/scene/SceneStart';
import { ScenePlaying } from '@/application/application/scene/ScenePlaying';
import { SceneGameover } from '@/application/application/scene/SceneGameover';

import { Score } from '@/application/domain/parts/score/Score';

export const P5: React.FC = () => {
  useEffect(() => {
    const ic = new InteractiveController();
    // const pc = new PC();
    // const sp = new SP();

    // const action: paramSetAction = {
    //   up: ic.up,
    //   down: ic.down,
    //   left: ic.left,
    //   right: ic.right,
    //   spinRight: ic.spinRight,
    //   spinLeft: ic.spinLeft,
    //   enter: ic.enter,
    //   offUp: ic.offUp,
    //   offDown: ic.offDown,
    //   offLeft: ic.offLeft,
    //   offRight: ic.offRight,
    //   offSpinRight: ic.offSpinRight,
    //   offSpinLeft: ic.offSpinLeft,
    //   offEnter: ic.offEnter,
    // };

    // pc.setAction(action);
    // sp.setAction(action);

    const tc = new TransferredController({
      interactiveController: ic,
    });

    const s1 = new SceneStart({
      transferredController: tc,
    });
    const s2 = new ScenePlaying({
      transferredController: tc,
      score: new Score(),
    });
    const s3 = new SceneGameover({
      transferredController: tc,
    });

    const sc = new SceneChangerP5({
      list: [s1, s2, s3],
      insertButtonsElement: document.querySelector('.game-wrapper'),
      canvasElement: document.querySelector('.canvas-wrapper'),
      interactiveController: ic,
    });
    sc.start();
    // ページ遷移したらシーンを削除する
    window.onpopstate = () => { sc.remove(); };
    window.ontouchstart = (e: Event) => e.preventDefault();
    window.ontouchmove = (e: Event) => e.preventDefault();
  }, []);

  return (
    <div className="game-wrapper">
      <div className="canvas-wrapper" />
    </div>
  );
};
