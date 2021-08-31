import { ActiveTetrominoStatus } from '@/type/Application';

export interface Field {
  update({ x, y, tetromino }: ActiveTetrominoStatus): void;
  canRemoveFullRow(): boolean;
  removeFullRow(): void;
  getStatus(): string[][];
}
