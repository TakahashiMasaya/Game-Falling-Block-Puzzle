import * as THREE from 'three';
import { Color, Mesh } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

type TInitText = {
  name: string
  text: string
  size: number
  x: number
  y: number
  z: number
  color?: string
}

type TInitTexts = TInitText[]

type TInitCounter = {
  name: string
  default: string
  size: number
  x: number
  y: number
  z: number
  color?: string
}

type TInitCounters = TInitCounter[]

type TInitTetrominos = {
  size: number
  tetrominos: {
    opacity: number
    x: number
    y: number
    color: string
  }[]
};

type TInitButtons = {
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

export class ThreeJS {
  private scene: THREE.Scene;

  private camera: THREE.PerspectiveCamera;

  private renderer: THREE.WebGLRenderer;

  private width: number;

  private height: number;

  private orbitControls: OrbitControls;

  private textMaterials: THREE.MeshBasicMaterial[] = [];

  private counterMaterials: TCounterMaterials = [];

  private tetrominosMesh: Mesh<THREE.BoxGeometry, THREE.MeshToonMaterial>[] = [];

  private tetrominoMaterials: THREE.MeshToonMaterial[] = [];

  private nextTetrominosMesh: Mesh<THREE.BoxGeometry, THREE.MeshToonMaterial>[] = [];

  private nextTetrominoMaterials: THREE.MeshToonMaterial[] = [];

  private buttonMaterials: THREE.MeshLambertMaterial[] = [];

  private groupTetromino: THREE.Group;

  private groupNextTetromino: THREE.Group;

  private texts: TInitTexts;

  private counters: TInitCounters;

  private tetrominos: TInitTetrominos;

  private nextTetrominos: TInitTetrominos;

  private buttons: TInitButtons;

  private meshObjects: THREE.Object3D<THREE.Event>[] = [];

  constructor({
    width,
    height,
    scene,
    camera,
    renderer,
    texts,
    counters,
    buttons,
    tetrominos,
    nextTetrominos,
  }: {
    width: number
    height: number
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    texts: TInitTexts
    counters: TInitCounters
    buttons: TInitButtons
    tetrominos: TInitTetrominos
    nextTetrominos: TInitTetrominos
  }) {
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.texts = texts;
    this.counters = counters;
    this.buttons = buttons;
    this.tetrominos = tetrominos;
    this.nextTetrominos = nextTetrominos;

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // グループを作る
    this.groupTetromino = new THREE.Group();
    this.groupNextTetromino = new THREE.Group();
    // 3D空間にグループを追加する
    this.scene.add(this.groupTetromino);
    this.scene.add(this.groupNextTetromino);
    this.createTetrominos();
    this.createNextTetrominos();

    // ボタンを作る
    this.createButton();

    // テキストを作る
    this.createText();

    // カウンターを作る
    this.createCounter();

    // ドラッグできるメッシュを抽出する
    this.scene.traverse((object: THREE.Object3D<THREE.Event>) => {
      if (object instanceof THREE.Mesh && object.userData.draggable) {
        this.meshObjects.push(object);
      }
    });

    // 平行光源を生成
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 100, 30);
    this.scene.add(light);

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.minDistance = 1;
    this.orbitControls.maxDistance = 10000;
  }

  private createText = () => {
    const loader = new FontLoader();
    loader.load('/test.json', (font) => {
      this.texts.forEach((text, i) => {
        const {
          name, text: tex, x, y, z, color, size,
        } = text;
        const textGeometry = new TextGeometry(tex, {
          size,
          height: 1,
          font,
          curveSegments: 5,
          bevelSize: 1,
          bevelEnabled: true,
        });
        this.textMaterials[i] = new THREE.MeshBasicMaterial();
        this.textMaterials[i].name = name;
        this.textMaterials[i].color.set(new Color(color));
        const t = new THREE.Mesh(textGeometry, this.textMaterials[i]);
        t.position.set(x, y, z);
        this.scene.add(t);
      });
    });
  };

  private createCounter = () => {
    const loader = new FontLoader();
    loader.load('/test.json', (font) => {
      this.counters.forEach((counter) => {
        const {
          x, y, z, default: d, color, size, name,
        } = counter;
        // 二重配列（桁数分 → 0-9の数字）
        const degitMaterials: THREE.MeshBasicMaterial[][] = new Array(d.length);
        d.split('').forEach((degitInDefault, j) => {
          // 1桁毎に0-9をセットする
          degitMaterials[j] = new Array(10);
          [...new Array(10)].forEach((num, k) => {
            const counterGeometry = new TextGeometry(k.toString(), {
              size,
              height: 1,
              font,
              curveSegments: 5,
              bevelSize: 1,
              bevelEnabled: true,
            });
            degitMaterials[j][k] = new THREE.MeshBasicMaterial();
            degitMaterials[j][k].color.set(new Color(color));
            degitMaterials[j][k].visible = false;
            const mesh = new THREE.Mesh(counterGeometry, degitMaterials[j][k]);
            mesh.position.set(x + (size * j), y, z);
            this.scene.add(mesh);
          });
        });
        this.counterMaterials = [
          ...this.counterMaterials,
          {
            name,
            materials: degitMaterials,
          },
        ];
      });
    });
  };

  private createButton = () => {
    Object.keys(this.buttons).forEach((button, i) => {
      const {
        x, y, width,
      } = this.buttons[button];
      const geometry = new THREE.SphereGeometry((width / 2), 64, 32);
      this.buttonMaterials[i] = new THREE.MeshLambertMaterial({
        color: 0x999000,
        name: button,
      });
      const sphereMesh = new THREE.Mesh(geometry, this.buttonMaterials[i]);
      sphereMesh.position.set(x, y, 0);
      this.scene.add(sphereMesh);

      sphereMesh.userData.draggable = true;
      sphereMesh.userData.name = button;
    });
  };

  private createTetrominos = () => {
    const { size, tetrominos } = this.tetrominos;
    tetrominos.forEach((tetromino, i) => {
      const {
        opacity, x, y, color,
      } = tetromino;
      // 箱を作成
      const geometry = new THREE.BoxGeometry(size, size, size);
      this.tetrominoMaterials[i] = new THREE.MeshToonMaterial({
        color,
        transparent: true,
      });
      this.tetrominoMaterials[i].opacity = opacity;
      this.tetrominosMesh[i] = new THREE.Mesh(geometry, this.tetrominoMaterials[i]);

      // 配置座標を計算
      this.tetrominosMesh[i].position.set(
        x, // X座標
        y, // Y座標
        0, // Z座標
      );
      // グループに追加する
      this.groupTetromino.add(this.tetrominosMesh[i]);
    });
  };

  private createNextTetrominos = () => {
    const { size, tetrominos } = this.nextTetrominos;
    tetrominos.forEach((tetromino, i) => {
      const {
        opacity, x, y, color,
      } = tetromino;
      // 箱を作成
      const geometry = new THREE.BoxGeometry(size, size, size);
      this.nextTetrominoMaterials[i] = new THREE.MeshToonMaterial({
        color,
        transparent: true,
      });
      this.nextTetrominoMaterials[i].opacity = opacity;
      this.nextTetrominosMesh[i] = new THREE.Mesh(geometry, this.nextTetrominoMaterials[i]);

      // 配置座標を計算
      this.nextTetrominosMesh[i].position.set(
        x, // X座標
        y, // Y座標
        0, // Z座標
      );
      // グループに追加する
      this.groupNextTetromino.add(this.nextTetrominosMesh[i]);
    });
  };

  public renderingText = ({
    draw,
  }: {
    draw: TRenderingText[]
  }) => {
    this.textMaterials.forEach((textMaterial, i) => {
      this.textMaterials[i].visible = false;
    });
    draw.forEach((d) => {
      this.textMaterials.forEach((textMaterial, i) => {
        if (textMaterial.name === d.name) {
          this.textMaterials[i].visible = true;
        }
      });
    });
  };

  public renderingCounter = (renderingCounter: TRenderingCounter) => {
    const { name, value } = renderingCounter;
    this.counterMaterials.forEach((counterMaterial, i) => {
      if (counterMaterial.name !== name) { return; }
      // 対象カウンター処理
      // 全桁を全て非表示にする
      const { materials } = counterMaterial;
      materials.forEach((degits, j) => {
        degits.forEach((number, k) => {
          this.counterMaterials[i].materials[j][k].visible = false;
        });
      });

      // value値を表示する
      value.split('').forEach((v, j) => {
        if (v.match(/[0-9]/)) {
          this.counterMaterials[i].materials[j][parseInt(v, 10)].visible = true;
        }
      });
    });
  };

  /**
   * tetromino表示
   *
   * @param {({
   *     draw: (TRenderingTetromino | null)[]
   *   })} {
   *     draw,
   *   }
   * @memberof ThreeJS
   */
  public renderingTetromino = ({
    draw,
  }: {
    draw: (TRenderingTetromino | null)[]
  }) => {
    draw.forEach((d, i) => {
      if (d === null) {
        this.tetrominoMaterials[i].opacity = 0;
        return;
      }
      const { fill, opacity } = d;
      this.tetrominoMaterials[i].color.set(fill);
      this.tetrominoMaterials[i].opacity = opacity;
    });
  };

  public renderingNextTetromino = ({
    draw,
  }: {
    draw: (TRenderingTetromino | null)[]
  }) => {
    draw.forEach((d, i) => {
      if (d === null) {
        this.nextTetrominoMaterials[i].opacity = 0;
        return;
      }
      const { fill, opacity } = d;
      this.nextTetrominoMaterials[i].color.set(fill);
      this.nextTetrominoMaterials[i].opacity = opacity;
    });
  };

  /**
   * カウンターを全て非表示にする
   *
   * @memberof ThreeJS
   */
  public renderingUnVisibleAllCounters = () => {
    this.counterMaterials.forEach((counterMaterial, i) => {
      // 全桁を全て非表示にする
      const { materials } = counterMaterial;
      materials.forEach((degits, j) => {
        degits.forEach((number, k) => {
          this.counterMaterials[i].materials[j][k].visible = false;
        });
      });
    });
  };

  public renderingClearAllTetrominos = () => {
    this.tetrominoMaterials.forEach(
      (tetromino, i) => {
        this.tetrominoMaterials[i].opacity = 0;
      },
    );
    this.nextTetrominoMaterials.forEach(
      (tetromino, i) => {
        this.nextTetrominoMaterials[i].opacity = 0;
      },
    );
  };

  public render = () => {
    this.orbitControls.update();

    // 描画
    this.renderer.render(this.scene, this.camera);
  };
}
