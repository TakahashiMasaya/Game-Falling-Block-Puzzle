import { Piece } from '@/type/Piece';
import { Tetromino } from './Tetromino';

export class ZTetromino extends Tetromino {
  public pieces: Piece[] = [
    [['z', 'z', '0'], ['0', 'z', 'z'], ['0', '0', '0']],
    [['0', 'z', '0'], ['z', 'z', '0'], ['z', '0', '0']],
    [['0', '0', '0'], ['z', 'z', '0'], ['0', 'z', 'z']],
    [['0', '0', 'z'], ['0', 'z', 'z'], ['0', 'z', '0']],
  ];
}
