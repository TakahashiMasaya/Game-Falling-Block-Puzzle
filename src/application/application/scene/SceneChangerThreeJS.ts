import * as THREE from 'three';
import { Image, Scene, TextInPlaying } from '@/type/Scene';
// import { paramSetAction, TBtPositions, TBtIndex } from '@/type/Controllers';
import { InteractiveController } from '@/application/interactor/InteractiveController';
import { ThreeJS, TRenderingTetromino } from '@/application/presenters/screen/ThreeJS';
import { PC } from '@/application/controllers/ThreeJS/PC';
import { SP } from '@/application/controllers/ThreeJS/SP';
import { paramSetAction } from '@/type/Controllers';
import { ScenePlaying } from './ScenePlaying';
import { SceneStart } from './SceneStart';
import { SceneGameover } from './SceneGameover';

const isTetrominos = (draw: any): draw is Image => draw.type === 'tetrominos'
    || draw.type === 'activeTetromino';

const isNextTetrominos = (draw: any): draw is Image => draw.type === 'nextTetromino';

const isScoreCounter = (draw: any): draw is TextInPlaying => draw.type === 'textScoreValueInPlaying';

const isLineCounter = (draw: any): draw is TextInPlaying => draw.type === 'textLinesValueInPlaying';

export class SceneChangerThreeJS {
  private list: Scene[];

  private interactiveController: InteractiveController;

  private isPlaying: boolean = false;

  private threeJS: ThreeJS;

  private animationID: number = 0;

  private sl: Generator<Scene, void, unknown>;

  private s: any;

  constructor({
    list,
    interactiveController,
  }: {
    list: Scene[],
    interactiveController: InteractiveController,
  }) {
    this.list = list;
    this.interactiveController = interactiveController;

    // create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f2350);

    // create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    camera.position.set(0, 0, 900);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // canvasをbodyに追加
    document.querySelector('.game-wrapper')?.appendChild(renderer.domElement);

    const action: paramSetAction = {
      action: {
        up: this.interactiveController.up,
        down: this.interactiveController.down,
        left: this.interactiveController.left,
        right: this.interactiveController.right,
        spinRight: this.interactiveController.spinRight,
        spinLeft: this.interactiveController.spinLeft,
        enter: this.interactiveController.enter,
        offUp: this.interactiveController.offUp,
        offDown: this.interactiveController.offDown,
        offLeft: this.interactiveController.offLeft,
        offRight: this.interactiveController.offRight,
        offSpinRight: this.interactiveController.offSpinRight,
        offSpinLeft: this.interactiveController.offSpinLeft,
        offEnter: () => {
          this.interactiveController.offEnter();
          if (this.s.constructor !== ScenePlaying) { return; }
          if (this.animationID === 0) {
            this.resume();
          } else {
            this.stop();
          }
        },
      },
    };

    const raycaster = new THREE.Raycaster();
    const vector2 = new THREE.Vector2();

    this.threeJS = new ThreeJS({
      width: window.innerWidth,
      height: window.innerHeight,
      scene,
      camera,
      renderer,
      texts: [
        {
          name: 'start',
          text: 'Play START!!',
          size: 30,
          x: 200,
          y: -300,
          z: 30,
          color: '0x111111',
        },
        {
          name: 'gameover',
          text: 'Gameover...',
          size: 30,
          x: 200,
          y: -300,
          z: 30,
          color: '0x999999',
        },
        {
          name: 'playing',
          text: 'Next',
          size: 20,
          x: 240,
          y: 0,
          z: 0,
          color: '0x999999',
        },
        {
          name: 'playing',
          text: 'Score',
          size: 20,
          x: 240,
          y: -150,
          z: 0,
          color: '0x999999',
        },
        {
          name: 'playing',
          text: 'Lines',
          size: 20,
          x: 240,
          y: -250,
          z: 0,
          color: '0x999999',
        },
      ],
      // カウンター
      counters: [
        {
          name: 'counter1',
          default: '0000000',
          size: 20,
          x: 240,
          y: -180,
          z: 0,
          color: '0x999999',
        },
        {
          name: 'counter2',
          default: '0000000',
          size: 20,
          x: 240,
          y: -280,
          z: 0,
          color: '0x999999',
        },
      ],
      // ボタンを作成する
      buttons: {
        up: {
          x: 80,
          y: -450,
          width: 50,
          height: 50,
        },
        left: {
          x: 40,
          y: -490,
          width: 50,
          height: 50,
        },
        right: {
          x: 120,
          y: -490,
          width: 50,
          height: 50,
        },
        down: {
          x: 80,
          y: -530,
          width: 50,
          height: 50,
        },
        spinLeft: {
          x: 220,
          y: -470,
          width: 50,
          height: 50,
        },
        spinRight: {
          x: 310,
          y: -470,
          width: 50,
          height: 50,
        },
        enter: {
          x: 265,
          y: -510,
          width: 50,
          height: 50,
        },
      },
      // tetromino(フレーム含)を作成する
      tetrominos: {
        size: 18,
        tetrominos: [...new Array(21)].map((arrayY, i) => {
          const size = 18;
          return [...new Array(12)].map((arrayX, j) => {
            if (i === 20) {
              return {
                opacity: 1,
                x: j * size,
                y: i * size * -1,
                color: 'rgb(50, 50, 50)',
              };
            }
            if (j === 0 || j === 11) {
              return {
                opacity: 1,
                x: j * size,
                y: i * size * -1,
                color: 'rgb(50, 50, 50)',
              };
            }
            return {
              opacity: 0,
              x: j * size,
              y: i * size * -1,
              color: 'rgb(50, 50, 50)',
            };
          }).flat();
        }).flat(),
      },
      nextTetrominos: {
        size: 18,
        tetrominos: [...new Array(4)].map((arrayY, i) => {
          const size = 18;
          return [...new Array(4)].map((arrayX, j) => ({
            opacity: 0,
            x: (j * size) + 260,
            y: ((i * size) + 30) * -1,
            color: 'rgb(50, 50, 50)',
          })).flat();
        }).flat(),
      },
    });

    // ボタン(メッシュ)を抽出する
    const meshButtons: THREE.Object3D<THREE.Event>[] = [];
    scene.traverse((object: THREE.Object3D<THREE.Event>) => {
      if (object instanceof THREE.Mesh && object.userData.draggable) {
        meshButtons.push(object);
      }
    });

    // 入力デバイスを設定する
    // PCはキーボードとマウスで操作させる
    const pc = new PC({
      raycaster,
      vector2,
      camera,
      meshButtons,
    });
    pc.setAction({
      ...action,
    });
    const sp = new SP({
      raycaster,
      vector2,
      camera,
      meshButtons,
    });
    sp.setAction({
      ...action,
    });

    // 平行光源を生成
    const light = new THREE.DirectionalLight(0x666666);
    light.position.set(1, 500, 1000);
    scene.add(light);

    // シーンを準備する
    this.sl = this.sceneList();
  }

  * sceneList() {
    yield this.list[0];
    yield this.list[1];
    yield this.list[2];
  }

  private draw = () => {
    this.animationID = window.requestAnimationFrame(this.draw);
    this.s.move();
    if (this.s.constructor === SceneStart) {
      // テキストの表示
      this.threeJS.renderingText({
        draw: [
          {
            name: 'start',
          },
        ],
      });
    }
    if (this.s.constructor === ScenePlaying) {
      // テキストの表示
      this.threeJS.renderingText({
        draw: [
          {
            name: 'playing',
          },
        ],
      });

      this.s.draw()
        .forEach((draw) => {
          if (isScoreCounter(draw)) {
            this.threeJS.renderingCounter({
              name: 'counter1',
              value: (draw.value || '0').padStart(7, '0'),
            });
          }
          if (isLineCounter(draw)) {
            this.threeJS.renderingCounter({
              name: 'counter2',
              value: (draw.value || '0').padStart(7, '0'),
            });
          }
        });

      // tetromino表示
      const drawTetromino:
        (TRenderingTetromino | null)[] = [...new Array(12 * 21)].map(() => null);
      this.s.draw()
        .forEach((draw) => {
          if (!isTetrominos(draw)) { return; }
          const { fill, position } = draw;
          const { x, y } = position;
          drawTetromino[(y * 12) + x] = {
            fill: fill || '',
            opacity: 1,
          };
        });
      this.threeJS.renderingTetromino({
        draw: drawTetromino,
      });

      // nexttetromino表示
      const drawNextTetromino:
        (TRenderingTetromino | null)[] = [...new Array(4 * 4)].map(() => null);
      this.s.draw()
        .forEach((draw) => {
          if (!isNextTetrominos(draw)) { return; }
          const { fill, position } = draw;
          const { x, y } = position;
          drawNextTetromino[(y * 4) + x] = {
            fill: fill || '',
            opacity: 1,
          };
        });
      this.threeJS.renderingNextTetromino({
        draw: drawNextTetromino,
      });
    }
    if (this.s.constructor === SceneGameover) {
      this.threeJS.renderingClearAllTetrominos();
      // テキストの表示
      this.threeJS.renderingText({
        draw: [
          {
            name: 'gameover',
          },
        ],
      });

      // カウンターを全て非表示にする
      this.threeJS.renderingUnVisibleAllCounters();
    }

    this.threeJS.render();

    if (this.s.isEnd()) {
      this.s = this.sl.next().value;
    }
    if (!this.s) {
      // 最初に戻り再開する
      this.sl = this.sceneList();
      this.s = this.sl.next().value;
    }
  };

  private resume = () => {
    this.draw();
  };

  /**
   * ThreeJSインスタンス生成
   *
   * @memberof SceneChangerP5
   */
  public start = () => {
    this.sl = this.sceneList();
    this.s = this.sl.next().value;
    this.draw();
  };

  private stop = () => {
    window.cancelAnimationFrame(this.animationID);
    this.animationID = 0;
  };

  /**
   * ThreeJSを削除する
   *
   * @memberof SceneChangerThreeJS
   */
  public remove = () => {
  };
}