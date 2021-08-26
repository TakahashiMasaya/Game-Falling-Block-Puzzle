import { Piece } from '@/type/Piece';
import { Tetromino } from '@/domain/parts/tetrominos/Tetromino';

export class ITetromino implements Tetromino {
  public pieces: Piece[] = [
    [['', 'i', '', ''], ['', 'i', '', ''], ['', 'i', '', ''], ['', 'i', '', '']],
    [['', '', '', ''], ['', '', '', ''], ['i', 'i', 'i', 'i'], ['', '', '', '']],
    [['', '', 'i', ''], ['', '', 'i', ''], ['', '', 'i', ''], ['', '', '', '']],
    [['', '', '', ''], ['i', 'i', 'i', 'i'], ['', '', '', ''], ['', '', '', '']],
  ]

  public spinStatus: number = 0

  public getPiece = (): Piece => this.pieces[this.spinStatus]

  public spinLeft = (): void => {
    this.spinStatus += 1;
    this.spinStatus %= this.pieces.length;
  }

  public spinRight = (): void => {
    this.spinStatus -= 1;
    const { length } = this.pieces;
    this.spinStatus = ((this.spinStatus % length) + length) % length;
  }
}
