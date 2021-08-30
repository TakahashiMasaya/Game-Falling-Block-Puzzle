import { ActiveTetrominoStatus } from '@/type/Application';

export interface Field {
  update({ x, y, tetromino }: ActiveTetrominoStatus): void;
  canRemoveLine(): boolean;
  removeLines(): void;
  getStatus(): string[][];
}
