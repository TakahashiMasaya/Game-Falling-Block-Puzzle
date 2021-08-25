import { Piece } from '@/type/Piece';

export interface Tetromino {
  pieces: Piece[]
  spinStatus: number
  getPiece(): string[][]
  spinLeft(): void
}
