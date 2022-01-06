import { TypeTetromino } from '@/type/Tetromino';
import { ITetromino } from './ITetromino';
import { JTetromino } from './JTetromino';
import { LTetromino } from './LTetromino';
import { OTetromino } from './OTetromino';
import { STetromino } from './STetromino';
import { TTetromino } from './TTetromino';
import { ZTetromino } from './ZTetromino';

export class NextTetromino {
  private tetromino: TypeTetromino | null = null;

  private type: number = 0;

  public set = (type: number): void => {
    this.type = type;
    switch (type) {
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
        this.tetromino = new ITetromino();
    }
  };

  get = () => ({
    type: this.type,
    tetromino: this.tetromino?.getPiece() || [[]],
  });
}
