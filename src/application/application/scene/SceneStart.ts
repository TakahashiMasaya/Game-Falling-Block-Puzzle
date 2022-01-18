import { paramScene } from '@/type/Application';
import { TransferredController } from '@/application/application/TransferredController';

import { Scene, Text } from '@/type/Scene';

export class SceneStart implements Scene {
  private transferredController : TransferredController;

  private end: boolean = false;

  private drawing: Text[] = [];

  constructor({
    transferredController,
  }: paramScene) {
    this.transferredController = transferredController;
  }

  public start = () => {};

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
      value: 'Press ■ button',
    }];
  };

  public draw = () => this.drawing;

  public isEnd = (): boolean => this.end;
}
