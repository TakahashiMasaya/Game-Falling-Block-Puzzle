export class Canvas {
  private canvas: HTMLCanvasElement | null;

  private context: CanvasRenderingContext2D | null;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
  }

  drawImage = ({
    texture,
    x,
    y,
  }): void => {
    this.context.drawImage(
      texture,
      x,
      y,
    );
  }
}
