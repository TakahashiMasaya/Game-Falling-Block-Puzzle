import { Piece } from '@/type/Piece';
import { Tetromino as InterfaceTetromino } from '@/type/Tetromino';

export class Tetromino implements InterfaceTetromino {
  public pieces: Piece[] = [];

  public spinStatus: number = 0;

  /**
   * 現在のpieceを取得する
   *
   * @return {*}  {Piece}
   */
  public getPiece = (): Piece => this.pieces[this.spinStatus];

  /**
   * 左回転時のpieceを取得する
   *
   * @memberof ITetromino
   */
  public getPieceToSpinLeft = (): Piece => {
    let sStatus: number = this.spinStatus;
    sStatus += 1;
    sStatus %= this.pieces.length;
    return this.pieces[sStatus];
  };

  /**
   * 右回転時のpieceを取得する
   *
   * @return {*}  {Piece}
   */
  public getPieceToSpinRight = (): Piece => {
    let sStatus: number = this.spinStatus;
    sStatus -= 1;
    const { length } = this.pieces;
    sStatus = ((sStatus % length) + length) % length;
    return this.pieces[sStatus];
  };

  /**
   * 左回転にセットする
   *
   */
  public spinLeft = (): void => {
    this.spinStatus += 1;
    this.spinStatus %= this.pieces.length;
  };

  /**
   * 右回転にセットする
   *
   * @memberof ITetromino
   */
  public spinRight = (): void => {
    this.spinStatus -= 1;
    const { length } = this.pieces;
    this.spinStatus = ((this.spinStatus % length) + length) % length;
  };
}
