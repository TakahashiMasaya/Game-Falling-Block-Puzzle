import { TransferredController } from '@/application/TransferredController';
import { InteractivePresenter } from '@/interactor/InteractivePresenter';
import { Score } from '@/domain/parts/score/Score';

export type TTransferredController = {
  up: number,
  right: number,
  down: number,
  left: number,
  spinRight: number,
  spinLeft: number,
  enter: number,
};

export type paramScene = {
  transferredController: TransferredController,
  interactivePresenter? : InteractivePresenter,
  score? : Score,
}

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
};

export type paramUserControllingTetromino = {
  left: boolean;
  right: boolean;
  down: boolean;
  spinLeft: boolean;
  spinRight: boolean;
};

export type paramIsCollision = {
  tetromino: ActiveTetrominoStatus;
  field: string[][];
}

export type paramTransferredScreen = {
  window: { width: number, height: number },
  screen: { width: number, height: number },
  verticalAlign?: 'center',
  horizonalAlign?: 'center',
}

export type paramTransfer = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export type paramTransfers = paramTransfer[]
