const DEFTetrominoID = {
  ITetromino: 0,
  JTetromino: 1,
  LTetromino: 2,
  OTetromino: 3,
  STetromino: 4,
  TTetromino: 5,
  ZTetromino: 6,
} as const;
export type TetrominoID = typeof DEFTetrominoID[keyof typeof DEFTetrominoID];

export type paramNextTetrominos = {
  stockQuantity: number, // ストックする数
  tetrominoQuantity: number, // Tetrominoの数
};

export type paramStartTetrominos = {
  x: number,
  y: number,
  tetromino: number,
};

export type ActiveTetrominoStatus = {
  x: number,
  y: number,
  tetromino: string[][],
} | null;

export type paramUserControllingTetromino = {
  left: boolean;
  right: boolean;
  down: boolean;
  spinLeft: boolean;
  spinRight: boolean;
};
