import { paramTransferredScreen, paramTransfer, paramTransfers } from '@/type/Application';

/**
 * 位置・サイズ情報を、画面表示用に変換する
 *
 * @export
 * @class TransferredScreen
 */
export class TransferredScreen {
  private window: { width: number, height: number } = { width: 0, height: 0 };

  private screen: { width: number, height: number } = { width: 0, height: 0 };

  private verticalAlign: 'center' | null = null;

  private horizonalAlign: 'center' | null = null;

  private rate: number = 1;

  constructor({
    window,
    screen,
    verticalAlign,
    horizonalAlign,
  }: paramTransferredScreen) {
    this.window = window;
    this.screen = screen;
    this.verticalAlign = verticalAlign || null;
    this.horizonalAlign = horizonalAlign || null;
    this.setRate();
  }

  /**
   * windowに対するscreenの比率を設定
   *
   * @private
   * @memberof TransferredScreen
   */
  private setRate = () => {
    const { width: ww, height: wh } = this.window;
    const { width: sw, height: sh } = this.screen;
    if (sw <= sh) {
      // screenの縦の比率が高い
      const rate = wh / sh;
      // screenの幅がwindowの幅を超える場合は、
      // screenの幅をwindowに併せ、幅を比率にする
      this.rate = (ww < sw * rate) ? ww / sw : rate;
    } else {
      const rate = ww / sw;
      this.rate = (wh < sh * rate) ? wh / sh : rate;
    }
  };

  /**
   * windowの幅・高さを再設定
   *
   * @memberof TransferredScreen
   */
  public resizeWindow = ({
    width,
    height,
  }: { width: number, height: number }) => {
    this.window = {
      width,
      height,
    };
    this.setRate();
  };

  /**
   * windowに対する、screenの横位置を設定する
   *
   * @private
   * @memberof TransferredScreen
   */
  private adjustHorizonally = (): number => {
    switch (this.horizonalAlign) {
      case 'center': {
        const { width: ww } = this.window;
        const { width: sw } = this.screen;
        return (ww > sw * this.rate) ? (ww / 2) - ((sw * this.rate) / 2) : 0;
      }
      default:
        return 0;
    }
  };

  /**
   * windowに対する、screenの縦位置を設定する
   *
   * @private
   * @memberof TransferredScreen
   */
  private adjustVertically = (): number => {
    switch (this.verticalAlign) {
      case 'center': {
        const { height: wh } = this.window;
        const { height: sh } = this.screen;
        return (wh > sh * this.rate) ? (wh / 2) - ((sh * this.rate) / 2) : 0;
      }
      default:
        return 0;
    }
  };

  /**
   * 位置・サイズを表示用に変換する
   *
   * @param {*} { width, height, x, y }
   * @memberof TransferredScreen
   */
  public transfer = (param: paramTransfer): {
    x: number, y: number, width: number, height: number
  } => {
    const {
      x, y, width, height,
    } = param;
    return {
      x: (x * this.rate) + this.adjustHorizonally(),
      y: (y * this.rate) + this.adjustVertically(),
      width: width * this.rate,
      height: height * this.rate,
    };
  };

  /**
   * 位置・サイズを表示用に変換する
   *
   * @param {*} { width, height, x, y }[]
   * @memberof TransferredScreen
   */
  public transfers = (param: paramTransfers) => param.map(this.transfer);
}
