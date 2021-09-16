import { InteractiveController } from '@/interactor/InteractiveController';
import { TTransferredController } from '@/type/Application';
import { TInteractiveController } from '@/type/InteractiveController';

/**
 * 入力ボタンの各種情報を、アプリケーション用に変換する
 *
 * @export
 * @class TransferredController
 */
export class TransferredController {
  private interactiveController: InteractiveController | null = null;

  private status: TTransferredController = {
    left: 0,
    up: 0,
    right: 0,
    down: 0,
    spinRight: 0,
    spinLeft: 0,
    enter: 0,
  };

  constructor({ interactiveController }: { interactiveController: InteractiveController}) {
    this.interactiveController = interactiveController;
  }

  public transfer = () => {
    if (this.interactiveController === null) { return; }
    const {
      up: u,
      left: l,
      right: r,
      spinRight: sr,
      spinLeft: sl,
      down: d,
      enter: e,
    }: TInteractiveController = this.interactiveController.keyStatus();

    const {
      up: tu,
      left: tl,
      right: tr,
      spinRight: tsr,
      spinLeft: tsl,
      down: td,
      enter: te,
    } = this.status;
    this.status = {
      up: (u) ? tu + 1 : 0,
      left: (l) ? tl + 1 : 0,
      right: (r) ? tr + 1 : 0,
      down: (d) ? td + 1 : 0,
      spinRight: (sr) ? tsr + 1 : 0,
      spinLeft: (sl) ? tsl + 1 : 0,
      enter: (e) ? te + 1 : 0,
    };
  }

  getStatus = () => {
    const {
      up, left, right, down, spinLeft, spinRight, enter,
    } = this.status;
    return {
      up: (up === 1), // 単射
      left: (left >= 1 && left % 5 === 1), // 連射
      right: (right >= 1 && right % 5 === 1), // 連射
      down: (down >= 1 && down % 5 === 1), // 連射
      spinRight: (spinRight === 1), // 単射
      spinLeft: (spinLeft === 1), // 単射
      enter: (enter === 1), // 単射
    };
  }

  reset = () => {
    this.status = {
      left: 0,
      up: 0,
      right: 0,
      down: 0,
      spinRight: 0,
      spinLeft: 0,
      enter: 0,
    };
    this.interactiveController?.reset();
  }
}
