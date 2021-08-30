import { Piece } from '@/type/Piece';
import { Tetromino } from './Tetromino';

export class OTetromino extends Tetromino {
  public pieces: Piece[] = [
    [['o', 'o'], ['o', 'o']],
    [['o', 'o'], ['o', 'o']],
  ];
}
