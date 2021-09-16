import { paramScene } from '@/type/Application';
import { TransferredController } from '@/application/TransferredController';
import { InteractivePresenter } from '@/interactor/InteractivePresenter';

import { Scene } from '@/type/Scene';

export class SceneGameover implements Scene {
  private transferredController : TransferredController;

  private interactivePresenter?: InteractivePresenter;

  private end: boolean = false;

  private drawing: any[] = [];

  constructor({
    transferredController,
    interactivePresenter,
  }: paramScene) {
    this.transferredController = transferredController;
    this.interactivePresenter = interactivePresenter;
  }

  public start = () => {}

  public move = () => {
    this.transferredController.transfer();
    const { enter } = this.transferredController.getStatus();
    if (enter) {
      this.end = true;
      this.transferredController.reset();
      return;
    }

    this.end = false;
    this.drawing = [{
      type: 'text',
      position: 'center',
      value: 'Gameover',
      size: 30,
    }];
  }

  public draw = () => this.drawing;

  public isEnd = (): boolean => this.end;
}
