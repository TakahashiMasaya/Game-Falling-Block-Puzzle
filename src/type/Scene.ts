export interface Scene {
  isEnd(): boolean;
  start(): void;
  move(): void;
  draw(): any;
}

export type Text = {
  type: 'text';
  position: string | { x: number, y: number };
  value?: string;
  size: number;
  fill?: string | number | null;
};

export type Image = {
  type: 'image';
  position: string | { x: number, y: number };
  width: number
  height: number,
  stroke: number | null,
  fill?: string | number | null,
};
