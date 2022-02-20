import * as THREE from 'three';
import { Color, Mesh } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {
  TCounterMaterials,
  TInitButtons,
  TInitCounters,
  TInitTetrominos,
  TInitTexts,
  TRenderingCounter,
  TRenderingTetromino,
  TRenderingText,
} from '@/type/Presenters';

export class ThreeJS {
  private scene: THREE.Scene;

  private camera: THREE.PerspectiveCamera;

  private renderer: THREE.WebGLRenderer;

  private raycaster: THREE.Raycaster;

  private vector2: THREE.Vector2;

  private textMaterials: THREE.MeshBasicMaterial[] = [];

  private counterMaterials: TCounterMaterials = [];

  private tetrominosMesh: Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = [];

  private tetrominoMaterials: THREE.MeshStandardMaterial[] = [];

  private nextTetrominosMesh: Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = [];

  private nextTetrominoMaterials: THREE.MeshStandardMaterial[] = [];

  private buttonMaterials: THREE.MeshStandardMaterial[] = [];

  private groupTetromino: THREE.Group;

  private groupNextTetromino: THREE.Group;

  private texts: TInitTexts;

  private counters: TInitCounters;

  private tetrominos: TInitTetrominos;

  private nextTetrominos: TInitTetrominos;

  private buttons: TInitButtons;

  private meshObjects: THREE.Object3D<THREE.Event>[] = [];

  constructor({
    scene,
    camera,
    renderer,
    raycaster,
    vector2,
    texts,
    counters,
    buttons,
    tetrominos,
    nextTetrominos,
  }: {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    raycaster: THREE.Raycaster
    vector2: THREE.Vector2
    texts: TInitTexts
    counters: TInitCounters
    buttons: TInitButtons
    tetrominos: TInitTetrominos
    nextTetrominos: TInitTetrominos
  }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.raycaster = raycaster;
    this.vector2 = vector2;
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

    // ボタンを抽出する
    this.scene.traverse((object: THREE.Object3D<THREE.Event>) => {
      if (object instanceof THREE.Mesh && object.userData.draggable) {
        this.meshObjects.push(object);
      }
    });
  }

  private createText = () => {
    const loader = new FontLoader();
    loader.load(`${process.env.ROOT_PATH}helvetiker_regular.typeface.json`, (font) => {
      this.texts.forEach((text, i) => {
        const {
          name, text: tex, x, y, z, color, size,
        } = text;
        const textGeometry = new TextGeometry(tex, {
          size,
          height: 3,
          font,
          curveSegments: 10,
        });
        this.textMaterials[i] = new THREE.MeshPhongMaterial();
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
    loader.load(`${process.env.ROOT_PATH}helvetiker_regular.typeface.json`, (font) => {
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
            degitMaterials[j][k] = new THREE.MeshPhongMaterial();
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

  private activeButtonMaterials = (
    intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[],
  ): string[] | null => {
    const result = intersects.reduce((ar: string[], intersect) => {
      if (!intersect.object.userData.draggable) { return ar; }
      // TODO: 強引にTHREE.Object3D<THREE.Event>[]
      // からTHREE.MeshToonMaterialへキャスト
      const buttonMaterial = this.meshObjects.find(
        (m) => ((m as THREE.Mesh).material as THREE.MeshLambertMaterial).name
            === intersect.object.userData.name,
      ) as THREE.Mesh;
      if (buttonMaterial) {
        const { name } = buttonMaterial.material as THREE.MeshLambertMaterial;
        return [
          ...ar,
          name,
        ];
      }
      return ar;
    }, []);
    // 複数検知された場合は、先頭要素（手前）を返す
    return (result.length === 0) ? null : [result[0]];
  };

  public focussedButtons = ({ x, y }: { x: number, y: number }): string[] | null => {
    this.vector2.x = (x / window.innerWidth) * 2 - 1;
    this.vector2.y = -(y / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.vector2, this.camera);
    const intersects = this.raycaster.intersectObjects(this.meshObjects, true);

    return this.activeButtonMaterials(intersects);
  };

  public resetColorAllButton = () => {
    this.buttonMaterials.forEach((buttonMaterial, i) => {
      this.buttonMaterials[i].color.set(0xfff888);
    });
  };

  public setActiveColorButton = (buttonName: string) => {
    this.buttonMaterials.forEach((buttonMaterial, i) => {
      if (buttonMaterial.name === buttonName) {
        this.buttonMaterials[i].color.set(0x990000);
      }
    });
  };

  private createButton = () => {
    Object.keys(this.buttons).forEach((button, i) => {
      const {
        x, y, width,
      } = this.buttons[button];
      const geometry = new THREE.SphereGeometry((width / 2), 64, 32);
      this.buttonMaterials[i] = new THREE.MeshStandardMaterial({
        color: 0xfff888,
        name: button,
      });
      this.buttonMaterials[i].roughness = 0.5;
      this.buttonMaterials[i].metalness = 0.7;
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
      this.tetrominoMaterials[i] = new THREE.MeshStandardMaterial({
        color,
        transparent: true,
      });
      this.tetrominoMaterials[i].opacity = opacity;
      this.tetrominoMaterials[i].roughness = 0.5;
      this.tetrominoMaterials[i].metalness = 0.9;
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
      this.nextTetrominoMaterials[i] = new THREE.MeshStandardMaterial({
        color,
        transparent: true,
      });
      this.nextTetrominoMaterials[i].opacity = opacity;
      this.nextTetrominoMaterials[i].roughness = 0.5;
      this.nextTetrominoMaterials[i].metalness = 0.9;
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
    this.renderer.render(this.scene, this.camera);
  };
}
