import { Piece } from '@/type/Piece';
import { ITetromino } from '@/application/domain/parts/tetrominos/ITetromino';
import { JTetromino } from '@/application/domain/parts/tetrominos/JTetromino';
import { LTetromino } from '@/application/domain/parts/tetrominos/LTetromino';
import { OTetromino } from '@/application/domain/parts/tetrominos/OTetromino';
import { STetromino } from '@/application/domain/parts/tetrominos/STetromino';
import { TTetromino } from '@/application/domain/parts/tetrominos/TTetromino';
import { ZTetromino } from '@/application/domain/parts/tetrominos/ZTetromino';

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
