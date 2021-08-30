import { Piece } from '@/type/Piece';
import { ITetromino } from '@/domain/parts/tetrominos/ITetromino';
import { JTetromino } from '@/domain/parts/tetrominos/JTetromino';
import { LTetromino } from '@/domain/parts/tetrominos/LTetromino';
import { OTetromino } from '@/domain/parts/tetrominos/OTetromino';
import { STetromino } from '@/domain/parts/tetrominos/STetromino';
import { TTetromino } from '@/domain/parts/tetrominos/TTetromino';
import { ZTetromino } from '@/domain/parts/tetrominos/ZTetromino';

export interface Tetromino {
  pieces: Piece[]
  spinStatus: number
  getPiece(): Piece
  getPieceToSpinLeft(): Piece
  getPieceToSpinRight(): Piece
  spinLeft(): void
  spinRight(): void
}

export type TypeTetromino =
  ITetromino | JTetromino | LTetromino | OTetromino | STetromino | TTetromino | ZTetromino
