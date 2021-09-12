import { Scene, paramScene } from '@/type/Application';
import { InteractiveController } from '@/interactor/InteractiveController';
import { InteractivePresenter } from '@/interactor/InteractivePresenter';

export class SceneGameover implements Scene {
  private interactiveController: InteractiveController;

  private interactivePresenter: InteractivePresenter;

  private end: boolean = false;

  private drawing: any[] = [];

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
      value: 'Gameover',
      size: 30,
    }];
  }

  public draw = () => this.drawing;

  public isEnd = (): boolean => this.end;
}
