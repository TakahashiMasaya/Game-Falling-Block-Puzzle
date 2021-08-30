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

  private status: ActiveTetrominoStatus = null;

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
  }

  public nextAction = ({
    left, right, down, spinLeft, spinRight,
  }: paramUserControllingTetromino): ActiveTetrominoStatus => {
    let { x, y, tetromino } = this.status;
    y += 1;
    x = (left) ? x - 1 : x;
    x = (right) ? x + 1 : x;
    y = (down) ? y + 1 : y;
    tetromino = (spinLeft) ? this.tetromino.getPieceToSpinLeft() : tetromino;
    tetromino = (spinRight) ? this.tetromino.getPieceToSpinRight() : tetromino;
    return {
      x, y, tetromino,
    };
  }

  public setAction = ({
    left, right, down, spinLeft, spinRight,
  }: paramUserControllingTetromino): void => {
    let { x, y, tetromino } = this.status;
    y += 1;
    x = (left) ? x - 1 : x;
    x = (right) ? x + 1 : x;
    y = (down) ? y + 1 : y;
    if (spinLeft) this.tetromino.spinLeft();
    if (spinRight) this.tetromino.spinRight();
    tetromino = this.tetromino.getPiece();
    this.status = {
      x, y, tetromino,
    };
  }

  public getStatus = (): ActiveTetrominoStatus => this.status;
}
