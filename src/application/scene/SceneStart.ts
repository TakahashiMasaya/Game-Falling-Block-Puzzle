import { Scene, paramScene } from '@/type/Application';
import { InteractiveController } from '@/interactor/InteractiveController';
import { InteractivePresenter } from '@/interactor/InteractivePresenter';
import { Text, Image } from '@/type/Scene';

export class SceneStart implements Scene {
  private interactiveController: InteractiveController;

  private interactivePresenter: InteractivePresenter;

  private end: boolean = false;

  private drawing: (Text | Image)[] = [];

  constructor({
    interactiveController,
    interactivePresenter,
  }: paramScene) {
    this.interactiveController = interactiveController;
    this.interactivePresenter = interactivePresenter;
  }

  public move = () => {
    const { enter } = this.interactiveController.keyStatus();
    if (enter) {
      this.end = true;
      this.interactiveController.reset();
      return;
    }

    this.end = false;
    this.drawing = [{
      type: 'text',
      position: 'center',
      value: 'Press Start',
      size: 30,
    }];
  }

  public draw = () => this.drawing;

  public isEnd = (): boolean => this.end;
}
