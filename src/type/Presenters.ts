import p5 from 'p5';
import * as THREE from 'three';

export type Buttons = {
  up: p5.Element;
  left: p5.Element;
  right: p5.Element;
  down: p5.Element;
  spinRight: p5.Element;
  spinLeft: p5.Element;
  enter: p5.Element;
};

type TInitText = {
  name: string
  text: string
  size: number
  x: number
  y: number
  z: number
  color?: string
}

export type TInitTexts = TInitText[]

type TInitCounter = {
  name: string
  default: string
  size: number
  x: number
  y: number
  z: number
  color?: string
}

export type TInitCounters = TInitCounter[]

export type TInitTetrominos = {
  size: number
  tetrominos: {
    opacity: number
    x: number
    y: number
    color: string
  }[]
};

export type TInitButtons = {
  [key: string]: {
    x: number
    y: number
    width: number
    height: number
  }
}

type TCounterName = string;
type TCounterDegit = THREE.MeshBasicMaterial
type TCounterDegitMaterials = TCounterDegit[][]

export type TCounterMaterial = {
  name: TCounterName,
  materials: TCounterDegitMaterials,
}

export type TCounterMaterials = TCounterMaterial[]

export type TRenderingTetromino = {
  fill: string
  opacity: number
}

export type TRenderingText = {
  name: string
}

export type TRenderingCounter = {
  name: string,
  value: string,
}
