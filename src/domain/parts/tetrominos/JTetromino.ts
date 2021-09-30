import { Piece } from '@/type/Piece';
import { Tetromino } from './Tetromino';

export class JTetromino extends Tetromino {
  public pieces: Piece[] = [
    [['0', '0', 'j'], ['0', '0', 'j'], ['0', 'j', 'j']],
    [['j', 'j', 'j'], ['0', '0', 'j'], ['0', '0', '0']],
    [['j', 'j', '0'], ['j', '0', '0'], ['j', '0', '0']],
    [['0', '0', '0'], ['j', '0', '0'], ['j', 'j', 'j']],
  ]
}
