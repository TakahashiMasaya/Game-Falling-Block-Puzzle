import { paramNextTetrominos } from '@/type/Application';

export class NextTetrominos {
  private list: number[] = [];

  private stockQuantity: number;

  private tetrominoQuantity: number;

  /**
   * Creates an instance of NextTetrominos.
   * @param {paramNextTetrominos} { stockQuantity, tetrominoQuantity }
   * @memberof NextTetrominos
   */
  constructor({ stockQuantity, tetrominoQuantity }: paramNextTetrominos) {
    this.stockQuantity = stockQuantity || 1;
    this.tetrominoQuantity = tetrominoQuantity || 1;
    this.readyToTetrominos();
  }

  /**
   * Tetrominoをlist分セットする
   *
   * @private
   * @memberof NextTetrominos
   */
  private readyToTetrominos = (): void => {
    this.list = [...new Array(this.stockQuantity)]
      .map(() => Math.trunc(Math.random() * this.tetrominoQuantity));
  }

  /**
   * リストを取得する
   *
   * @return {*}  {number[]}
   */
  public getList = (): number[] => this.list

  /**
   * 次の数字を取得する
   * listの先頭を取得し、listの末尾に新しい数字をセットする
   *
   * @return {*}  {number}
   */
  public next = (): number => {
    const next = this.list.shift();
    this.list.push(Math.trunc(Math.random() * this.tetrominoQuantity));
    return next || 0;
  }
}
