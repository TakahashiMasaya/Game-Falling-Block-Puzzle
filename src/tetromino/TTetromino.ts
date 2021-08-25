import { Piece } from '@/type/Piece';
import { Tetromino } from '@/tetromino/Tetromino';

export class TTetromino implements Tetromino {
  public pieces: Piece[] = [
    [['', '', ''], ['t', 't', 't'], ['', 't', '']],
    [['t', '', ''], ['t', 't', ''], ['t', '', '']],
    [['', '', ''], ['', 't', ''], ['t', 't', 't']],
    [['', '', 't'], ['', 't', 't'], ['', '', 't']],
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
