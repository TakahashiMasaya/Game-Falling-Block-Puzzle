import { Scene, paramScene } from '@/type/Application';
import { Text, Image } from '@/type/Scene';
import { TransferredController } from '@/application/TransferredController';
import { InteractivePresenter } from '@/interactor/InteractivePresenter';
import { Score } from '@/domain/parts/score/Score';

import { Field10x20 } from '@/domain/parts/field/Field10x20';
import { ActiveTetromino } from '@/domain/parts/tetrominos/ActiveTetromino';
import { NextTetromino } from '@/domain/parts/tetrominos/NextTetromino';
import { CollisionalDetector } from '../CollisionalDetector';

const at = new ActiveTetromino();
const nt = new NextTetromino();
const cd = new CollisionalDetector();
const f = new Field10x20();

type typeControllButtons = {
  left: number,
  right: number,
  down: number,
  spinRight: number,
  spinLeft: number,
};

export class ScenePlaying implements Scene {
  private transferredController : TransferredController;

  private interactivePresenter: InteractivePresenter;

  private score: Score;

  private end: boolean = false;

  private drawing: (Text | Image)[] = [];

  private tetrominoCollidedTimes: number = 0;

  private animationStatus: string = 'start';

  private animationCount: number = 0;

  private isGameover: boolean = false;

  private nextTetromino: {
    type: number, tetromino: (string[][] | null)
  } = { type: 0, tetromino: null };

  private transferredControllerStatus: typeControllButtons = {
    left: 0,
    right: 0,
    down: 0,
    spinRight: 0,
    spinLeft: 0,
  };

  constructor({
    transferredController,
    interactivePresenter,
    score,
  }: paramScene) {
    this.transferredController = transferredController;
    this.interactivePresenter = interactivePresenter;
    this.score = score;
  }

  /**
   * fieldとtetrominoの表示設定
   *
   * @private
   * @memberof ScenePlaying
   */
  private setDrawing = () => {
    if (at.getStatus() === null) { return; }
    const { x: fx, y: fy, tetromino } = at.getStatus();
    const getFillColor = (num) => {
      switch (num) {
        case '1':
          return '#444444';
        case 'i':
          return '#888800';
        case 'ｊ':
          return '#0000aa';
        case 'l':
          return '#00aaaa';
        case 'o':
          return '#aaaa00';
        case 't':
          return '#6666aa';
        case 's':
          return '#aa6666';
        case 'z':
          return '#aaaa66';
        default:
          return '#aaaaaa';
      }
    };

    const { tetromino: nextTetromino } = this.nextTetromino;
    // fieldを表示
    this.drawing = f.getStatus()?.map((rows, y) => rows.reduce((ar, cu: string, x: number) => ((cu !== '0') ? [...ar, {
      type: 'image',
      position: { x: x * 20 + 30, y: y * 20 + 50 },
      width: 20,
      height: 20,
      stroke: 0,
      fill: getFillColor(cu),
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
        fill: getFillColor(cu),
      }] : ar), [])).flat(),
      {
        type: 'text',
        position: { x: 300, y: 100 },
        value: 'next',
        fill: 255,
        size: 30,
      },
      ...nextTetromino?.map((rows, y) => rows.reduce((ar, cu: string, x: number) => ((cu !== '0') ? [...ar, {
        type: 'image',
        position: { x: (x * 20) + 270, y: (y * 20) + 120 },
        width: 20,
        height: 20,
        stroke: 0,
        fill: getFillColor(cu),
      }] : ar), [])).flat(),
      {
        type: 'text',
        position: { x: 300, y: 250 },
        value: 'score',
        fill: 255,
        size: 30,
      },
      {
        type: 'text',
        position: { x: 300, y: 280 },
        value: this.score.get(),
        fill: 255,
        size: 30,
      },
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
    } = this.transferredController.getStatus();
    if (down) { this.score.add(10); }

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
      this.tetrominoCollidedTimes += 1;
      const { y: fy } = at.getStatus();
      if (fy <= 0) {
        // ゲームオーバー
        this.isGameover = true;
        return;
      }
      return;
    }
    at.setAction({
      left: false,
      right: false,
      spinRight: false,
      spinLeft: false,
      down: auto || down,
    });
    this.tetrominoCollidedTimes = 0;
  }

  /**
   * 横に移動する
   *
   * @private
   * @memberof ScenePlaying
   */
  private moveHorizontally = (): void => {
    const {
      left, right, spinLeft, spinRight,
    } = this.transferredController.getStatus();

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
    this.transferredController.transfer();
    switch (this.animationStatus) {
      case 'start':
        f.init();
        this.score.reset();
        this.animationCount = 0;
        this.animationStatus = 'dropTetromino';
        this.end = false;
        this.isGameover = false;
        nt.set(Math.trunc(Math.random() * 7));
        this.nextTetromino = nt.get();
        break;
      case 'dropTetromino': {
        // 次のtetrominoをセットする
        // tetrominoを選択し、drop開始する
        at.start({ x: 4, y: 0, tetromino: this.nextTetromino.type });
        nt.set(Math.trunc(Math.random() * 7));
        this.nextTetromino = nt.get();
        this.animationStatus = 'droppingTetromino';
        this.tetrominoCollidedTimes = 0;
        break;
      }
      case 'droppingTetromino': {
        if (this.isGameover) {
          // ゲームオーバーの時
          this.animationCount = 0;
          this.animationStatus = 'gameover';
          break;
        }
        if (this.tetrominoCollidedTimes > 5) {
          // 衝突時間が一定を超えた時
          this.animationCount = 0;
          this.tetrominoCollidedTimes = 0;
          this.animationStatus = 'updateField';
          break;
        }

        if (this.animationCount % 10 === 0) {
          // 自動落下
          this.moveDropping(true);
        }
        if (this.tetrominoCollidedTimes === 0) {
          // 自動落下に衝突がなければ
          // 下ボタンによる落下
          this.moveDropping(false);
        }
        // 横と回転
        this.moveHorizontally();
        this.animationCount += 1;
        break;
      }
      case 'updateField': {
        // フィールドを更新する
        f.update(at.getStatus());
        at.clearTetromino();
        this.animationStatus = f.canRemoveFullRow()
          ? 'removeTetrominoInRow'
          : 'dropTetromino';
        break;
      }
      case 'removeTetrominoInRow': {
        // フィールド内のtetromino消去
        if (this.animationCount > 30) {
          this.score.add(f.getRemoveRows() * 1000);
          f.removeFullRow();
          this.animationStatus = 'dropTetromino';
          break;
        }
        this.animationCount += 1;
        break;
      }
      case 'gameover': {
        // ゲームオーバー
        if (this.animationCount > 50) {
          this.end = true;
          this.animationStatus = 'start';
          this.transferredController.reset();
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
