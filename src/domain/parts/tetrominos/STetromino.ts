import { Piece } from '@/type/Piece';
import { Tetromino } from './Tetromino';

export class STetromino extends Tetromino {
  public pieces: Piece[] = [
    [['0', 's', 's'], ['s', 's', '0'], ['0', '0', '0']],
    [['s', '0', '0'], ['s', 's', '0'], ['0', 's', '0']],
    [['0', '0', '0'], ['s', 's', '0'], ['0', 's', 's']],
    [['0', 's', '0'], ['0', 's', 's'], ['0', '0', 's']],
  ];
}
