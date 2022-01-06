import { TypeTetromino } from '@/type/Tetromino';
import { ActiveTetrominoStatus, paramStartTetrominos, paramUserControllingTetromino } from '@/type/Application';
import { ITetromino } from './ITetromino';
import { JTetromino } from './JTetromino';
import { LTetromino } from './LTetromino';
import { OTetromino } from './OTetromino';
import { STetromino } from './STetromino';
import { TTetromino } from './TTetromino';
import { ZTetromino } from './ZTetromino';

export class ActiveTetromino {
  private tetromino: TypeTetromino | null = null;

  private status: ActiveTetrominoStatus | null = null;

  public start = ({ x, y, tetromino }: paramStartTetrominos): void => {
    switch (tetromino) {
      case 0:
        this.tetromino = new ITetromino();
        break;
      case 1:
        this.tetromino = new JTetromino();
        break;
      case 2:
        this.tetromino = new LTetromino();
        break;
      case 3:
        this.tetromino = new OTetromino();
        break;
      case 4:
        this.tetromino = new STetromino();
        break;
      case 5:
        this.tetromino = new TTetromino();
        break;
      case 6:
        this.tetromino = new ZTetromino();
        break;
      default:
        this.tetromino = null;
    }
    if (this.tetromino === null) { return; }
    this.status = {
      x, y, tetromino: this.tetromino.getPiece(),
    };
  };

  /**
   * 引数に合わせて次のTetrominoの位置、状態を取得する
   *
   * @param {paramUserControllingTetromino} {
   *     left, right, down, spinLeft, spinRight,
   *   }
   * @memberof ActiveTetromino
   */
  public nextAction = ({
    left, right, down, spinLeft, spinRight,
  }: paramUserControllingTetromino): ActiveTetrominoStatus => {
    if (!this.status) { return { x: 0, y: 0, tetromino: [[]] }; }
    let { x, y, tetromino } = this.status;
    x = (left) ? x - 1 : x;
    x = (right) ? x + 1 : x;
    y = (down) ? y + 1 : y;
    tetromino = (spinLeft && this.tetromino) ? this.tetromino.getPieceToSpinLeft() : tetromino;
    tetromino = (spinRight && this.tetromino) ? this.tetromino.getPieceToSpinRight() : tetromino;
    return {
      x, y, tetromino,
    };
  };

  /**
   * 引数にあわせて、Tetrominoの位置、状態を設定する
   *
   * @param {paramUserControllingTetromino} {
   *     left, right, down, spinLeft, spinRight,
   *   }
   * @memberof ActiveTetromino
   */
  public setAction = ({
    left, right, down, spinLeft, spinRight,
  }: paramUserControllingTetromino): void => {
    if (!this.status) { return; }
    let { x, y, tetromino } = this.status;
    x = (left) ? x - 1 : x;
    x = (right) ? x + 1 : x;
    y = (down) ? y + 1 : y;
    if (spinLeft) this.tetromino?.spinLeft();
    if (spinRight) this.tetromino?.spinRight();
    tetromino = this.tetromino?.getPiece() || tetromino;
    this.status = {
      x, y, tetromino,
    };
  };

  /**
   * Tetrominoを下に位置する
   *
   * @memberof ActiveTetromino
   */
  public setDropping = (): void => {
    if (!this.status) { return; }
    const { y } = this.status;
    this.status = {
      ...this.status,
      y: y + 1,
    };
  };

  /**
   * Tetrominoの中身をクリアする
   *
   * @memberof ActiveTetromino
   */
  public clearTetromino = (): void => {
    if (!this.status) { return; }
    this.status = {
      ...this.status,
      tetromino: [],
    };
  };

  /**
   * Tetrominoの位置、状態を取得
   *
   * @memberof ActiveTetromino
   */
  public getStatus = (): ActiveTetrominoStatus => this.status || { x: 0, y: 0, tetromino: [[]] };
}
