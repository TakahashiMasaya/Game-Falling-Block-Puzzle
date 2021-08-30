import { Piece } from '@/type/Piece';
import { Tetromino } from './Tetromino';

export class LTetromino extends Tetromino {
  public pieces: Piece[] = [
    [['l', '0', '0'], ['l', '0', '0'], ['l', 'l', '0']],
    [['0', '0', '0'], ['0', '0', 'l'], ['l', 'l', 'l']],
    [['0', 'l', 'l'], ['0', '0', 'l'], ['0', '0', 'l']],
    [['l', 'l', 'l'], ['l', '0', '0'], ['0', '0', '0']],
  ];
}
