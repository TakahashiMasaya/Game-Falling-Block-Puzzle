import { TInteractiveController } from '@/type/InteractiveController';

export class InteractiveController {
  private status: TInteractiveController = {
    up: false,
    right: false,
    down: false,
    left: false,
    spinRight: false,
    spinLeft: false,
    enter: false,
  };

  public keyStatus = (): TInteractiveController => this.status;

  public reset = (): void => {
    Object.keys(this.status).forEach((key) => {
      this.status[key as keyof TInteractiveController] = false;
    });
  };

  public up = (): void => {
    this.status = {
      ...this.status,
      up: true,
    };
  };

  public down = (): void => {
    this.status = {
      ...this.status,
      down: true,
    };
  };

  public right = (): void => {
    this.status = {
      ...this.status,
      right: true,
    };
  };

  public left = (): void => {
    this.status = {
      ...this.status,
      left: true,
    };
  };

  public spinLeft = (): void => {
    this.status = {
      ...this.status,
      spinLeft: true,
    };
  };

  public spinRight = (): void => {
    this.status = {
      ...this.status,
      spinRight: true,
    };
  };

  public enter = (): void => {
    this.status = {
      ...this.status,
      enter: true,
    };
  };

  public offUp = (): void => {
    this.status = {
      ...this.status,
      up: false,
    };
  };

  public offDown = (): void => {
    this.status = {
      ...this.status,
      down: false,
    };
  };

  public offRight = (): void => {
    this.status = {
      ...this.status,
      right: false,
    };
  };

  public offLeft = (): void => {
    this.status = {
      ...this.status,
      left: false,
    };
  };

  public offSpinLeft = (): void => {
    this.status = {
      ...this.status,
      spinLeft: false,
    };
  };

  public offSpinRight = (): void => {
    this.status = {
      ...this.status,
      spinRight: false,
    };
  };

  public offEnter = (): void => {
    this.status = {
      ...this.status,
      enter: false,
    };
  };
}
