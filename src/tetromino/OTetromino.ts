import { Piece } from '@/type/Piece';
import { Tetromino } from '@/tetromino/Tetromino';

export class OTetromino implements Tetromino {
  public pieces: Piece[] = [
    [['o', 'o'], ['o', 'o']],
    [['o', 'o'], ['o', 'o']],
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
