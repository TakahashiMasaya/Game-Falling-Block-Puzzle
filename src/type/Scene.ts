export interface Scene {
  isEnd: () => boolean;
  start: () => void;
  move: () => void;
  draw: () => void;
}

export type Text = {
  type: 'text';
  value?: string;
};

export type TextInPlaying = {
  type: 'textNextInPlaying' | 'textScoreInPlaying' | 'textScoreValueInPlaying' | 'textLinesInPlaying' | 'textLinesValueInPlaying';
  value?: string;
};

export type Image = {
  type: 'tetrominos' | 'activeTetromino' | 'nextTetromino';
  position: { x: number, y: number };
  fill?: string | null,
};
