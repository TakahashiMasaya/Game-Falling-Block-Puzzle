import { Scene, paramScene } from '@/type/Application';
import { Text, Image } from '@/type/Scene';
import { InteractiveController } from '@/interactor/InteractiveController';
import { InteractivePresenter } from '@/interactor/InteractivePresenter';

import { Field10x20 } from '@/domain/parts/field/Field10x20';
import { ActiveTetromino } from '@/domain/parts/tetrominos/ActiveTetromino';
import { CollisionalDetector } from '../CollisionalDetector';

const at = new ActiveTetromino();
const cd = new CollisionalDetector();
const f = new Field10x20();

export class ScenePlaying implements Scene {
  private interactiveController: InteractiveController;

  private interactivePresenter: InteractivePresenter;

  private end: boolean = false;

  private drawing: (Text | Image)[] = [];

  private collided: boolean = false;

  private animationStatus: string = 'start';

  private animationCount: number = 0;

  private isGameover: boolean = false;

  constructor({
    interactiveController,
    interactivePresenter,
  }: paramScene) {
    this.interactiveController = interactiveController;
    this.interactivePresenter = interactivePresenter;
  }

  private setDrawing = () => {
    if (at.getStatus() === null) { return; }
    const { x: fx, y: fy, tetromino } = at.getStatus();
    // MAPを表示
    this.drawing = f.getStatus()?.map((rows, y) => rows.reduce((ar, cu: string, x: number) => ((cu !== '0') ? [...ar, {
      type: 'image',
      position: { x: x * 20 + 30, y: y * 20 + 50 },
      width: 20,
      height: 20,
      stroke: 0,
      fill: 150,
    }] : ar), [])).flat();
    // Tetrominoを表示
    this.drawing = [
      ...this.drawing,
      ...tetromino?.map((rows, y) => rows.reduce((ar, cu: string, x: number) => ((cu !== '0') ? [...ar, {
        type: 'image',
        position: { x: (x * 20) + 30 + (fx * 20), y: (y * 20) + 50 + (fy * 20) },
        width: 20,
        height: 20,
        stroke: 0,
        fill: 150,
      }] : ar), [])).flat(),
    ];
  }

  /**
   * 下に落下する
   *
   * @private
   * @param {boolean} auto
   * @memberof ScenePlaying
   */
  private moveDropping = (auto: boolean): void => {
    const {
      down,
    } = this.interactiveController.keyStatus();
    if (cd.isCollision({
      tetromino: at.nextAction({
        left: false,
        right: false,
        down: auto || down,
        spinLeft: false,
        spinRight: false,
      }),
      field: f.getStatus(),
    })) {
      this.collided = true;
      const { y: fy } = at.getStatus();
      if (fy <= 0) {
        // ゲームオーバー
        this.isGameover = true;
        return;
      }
      at.setAction({
        left: false,
        right: false,
        spinRight: false,
        spinLeft: false,
        down: auto || down,
      });
      f.update(at.getStatus());
      return;
    }
    at.setAction({
      left: false,
      right: false,
      spinRight: false,
      spinLeft: false,
      down: auto || down,
    });
  }

  /**
   * 横に移動する
   *
   * @private
   * @memberof ScenePlaying
   */
  private moveHorizontally = (): void => {
    const {
      left,
      right,
      spinRight,
      spinLeft,
    } = this.interactiveController.keyStatus();
    if (cd.isCollision({
      tetromino: at.nextAction({
        left,
        right,
        down: false,
        spinLeft,
        spinRight,
      }),
      field: f.getStatus(),
    })) {
      // 衝突してる
      return;
    }
    at.setAction({
      left,
      right,
      spinRight,
      spinLeft,
      down: false,
    });
  }

  public move = () => {
    this.drawing = [];
    switch (this.animationStatus) {
      case 'start':
        f.init();
        this.animationStatus = 'dropTetromino';
        this.end = false;
        this.isGameover = false;
        break;
      case 'dropTetromino': {
        // tetrominoを選択し、drop開始する
        at.start({ x: 4, y: 0, tetromino: Math.trunc(Math.random() * 7) });
        this.animationStatus = 'droppingTetromino';
        this.collided = false;
        break;
      }
      case 'droppingTetromino': {
        if (this.isGameover) {
          // ゲームオーバーの時
          this.animationCount = 0;
          this.animationStatus = 'gameover';
          break;
        }
        if (f.canRemoveFullRow()) {
          // 行を消去できる時
          this.animationCount = 0;
          this.animationStatus = 'removeFullRow';
          break;
        }
        if (this.collided) {
          // 次のtetrominoのセット
          this.animationStatus = 'dropTetromino';
          break;
        }
        if (this.animationCount % 5 === 0) {
          this.moveHorizontally();
        }
        if (this.animationCount % 10 === 0) {
          // 自動落下
          this.moveDropping(true);
          if (!this.collided) {
            // 下ボタンによる落下
            this.moveDropping(false);
          }
        }
        this.animationCount += 1;
        break;
      }
      case 'removeFullRow': {
        // 消去
        if (this.animationCount > 50) {
          f.removeFullRow();
          this.animationStatus = 'dropTetromino';
          this.animationCount = 0;
          break;
        }
        this.animationCount += 1;
        break;
      }
      case 'gameover': {
        // ゲームオーバー
        if (this.animationCount > 50) {
          this.end = true;
          this.animationCount = 0;
          this.animationStatus = 'start';
          this.interactiveController.reset();
          break;
        }
        this.animationCount += 1;
        break;
      }
      default:
    }
    this.setDrawing();
  }

  public draw = () => this.drawing;

  public isEnd = (): boolean => this.end;
}
