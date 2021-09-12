export type Text = {
  type: 'text';
  position: string | { x: number, y: number };
  value: string
  size: number,
};

export type Image = {
  type: 'image';
  position: string | { x: number, y: number };
  width: number
  height: number,
  stroke: number | null,
  fill: number | null,
};
