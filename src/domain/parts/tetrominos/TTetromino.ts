import { Piece } from '@/type/Piece';
import { Tetromino } from './Tetromino';

export class TTetromino extends Tetromino {
  public pieces: Piece[] = [
    [['0', '0', '0'], ['t', 't', 't'], ['0', 't', '0']],
    [['t', '0', '0'], ['t', 't', '0'], ['t', '0', '0']],
    [['0', '0', '0'], ['0', 't', '0'], ['t', 't', 't']],
    [['0', '0', 't'], ['0', 't', 't'], ['0', '0', 't']],
  ];
}
