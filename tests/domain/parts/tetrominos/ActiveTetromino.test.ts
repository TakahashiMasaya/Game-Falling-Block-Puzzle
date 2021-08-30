import { ActiveTetromino } from '@/domain/parts/tetrominos/ActiveTetromino';

describe('ActiveTetromino', () => {
  describe('start()', () => {
    it('パラメータによる指定パーツ(ITetromino)が正しいこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(0);
      expect(tetromino).toEqual(expect.arrayContaining([['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0']]));
    });
    it('パラメータによる指定パーツ(JTetromino)が正しいこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 1 });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(0);
      expect(tetromino).toEqual(expect.arrayContaining([['0', '0', 'j'], ['0', '0', 'j'], ['0', 'j', 'j']]));
    });
    it('パラメータによる指定パーツ(LTetromino)が正しいこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 2 });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(0);
      expect(tetromino).toEqual(expect.arrayContaining([['l', '0', '0'], ['l', '0', '0'], ['l', 'l', '0']]));
    });
    it('パラメータによる指定パーツ(OTetromino)が正しいこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 3 });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(0);
      expect(tetromino).toEqual(expect.arrayContaining([['o', 'o'], ['o', 'o']]));
    });
    it('パラメータによる指定パーツ(STetromino)が正しいこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 4 });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(0);
      expect(tetromino).toEqual(expect.arrayContaining([['0', 's', 's'], ['s', 's', '0'], ['0', '0', '0']]));
    });
    it('パラメータによる指定パーツ(TTetromino)が正しいこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 5 });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(0);
      expect(tetromino).toEqual(expect.arrayContaining([['0', '', '0'], ['t', 't', 't'], ['0', 't', '0']]));
    });
    it('パラメータによる指定パーツ(ZTetromino)が正しいこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 6 });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(0);
      expect(tetromino).toEqual(expect.arrayContaining([['z', 'z', '0'], ['0', 'z', 'z'], ['0', '0', '0']]));
    });
  });
  describe('nextAction()', () => {
    it('左に動く情報を取得すること', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      const { x, y, tetromino } = at.nextAction({
        left: true,
        right: false,
        down: false,
        spinLeft: false,
        spinRight: false,
      });
      expect(x).toEqual(3);
      expect(y).toEqual(1);
      expect(tetromino).toEqual(expect.arrayContaining([['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0']]));
    });

    it('右に動く情報を取得すること', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      const { x, y, tetromino } = at.nextAction({
        left: false,
        right: true,
        down: false,
        spinLeft: false,
        spinRight: false,
      });
      expect(x).toEqual(5);
      expect(y).toEqual(1);
      expect(tetromino).toEqual(expect.arrayContaining([['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0']]));
    });

    it('下に動く情報を取得すること', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      const { x, y, tetromino } = at.nextAction({
        left: false,
        right: false,
        down: true,
        spinLeft: false,
        spinRight: false,
      });
      expect(x).toEqual(4);
      expect(y).toEqual(2);
      expect(tetromino).toEqual(expect.arrayContaining([['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0']]));
    });

    it('左回転情報を取得すること', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      const { x, y, tetromino } = at.nextAction({
        left: false,
        right: false,
        down: false,
        spinLeft: true,
        spinRight: false,
      });
      expect(x).toEqual(4);
      expect(y).toEqual(1);
      expect(tetromino).toEqual(expect.arrayContaining([['0', '0', '0', '0'], ['0', '0', '0', '0'], ['i', 'i', 'i', 'i'], ['0', '0', '0', '0']]));
    });

    it('右回転情報を取得すること', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      const { x, y, tetromino } = at.nextAction({
        left: false,
        right: false,
        down: false,
        spinLeft: true,
        spinRight: false,
      });
      expect(x).toEqual(4);
      expect(y).toEqual(1);
      expect(tetromino).toEqual(expect.arrayContaining([['0', '0', '0', '0'], ['i', 'i', 'i', 'i'], ['0', '0', '0', '0'], ['0', '0', '0', '0']]));
    });
  });

  describe('setAction()', () => {
    it('moveLeft() 左に動くこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      at.setAction({
        left: true,
        right: false,
        down: false,
        spinLeft: false,
        spinRight: false,
      });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(3);
      expect(y).toEqual(1);
      expect(tetromino).toEqual(expect.arrayContaining([['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0']]));
    });

    it('moveLeft() 右に動くこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      at.setAction({
        left: false,
        right: true,
        down: false,
        spinLeft: false,
        spinRight: false,
      });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(5);
      expect(y).toEqual(1);
      expect(tetromino).toEqual(expect.arrayContaining([['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0']]));
    });

    it('moveLeft() 下に動くこと', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      at.setAction({
        left: false,
        right: false,
        down: true,
        spinLeft: false,
        spinRight: false,
      });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(2);
      expect(tetromino).toEqual(expect.arrayContaining([['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0']]));
    });

    it('spinLeft() 左回転すること', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      at.setAction({
        left: false,
        right: false,
        down: false,
        spinLeft: true,
        spinRight: false,
      });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(1);
      expect(tetromino).toEqual(expect.arrayContaining([['0', '0', '0', '0'], ['0', '0', '0', '0'], ['i', 'i', 'i', 'i'], ['0', '0', '0', '0']]));
    });

    it('spinRight() 右回転すること', () => {
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      at.setAction({
        left: false,
        right: false,
        down: false,
        spinLeft: false,
        spinRight: true,
      });
      const { x, y, tetromino } = at.getStatus();
      expect(x).toEqual(4);
      expect(y).toEqual(1);
      expect(tetromino).toEqual(expect.arrayContaining([['0', '0', '0', '0'], ['i', 'i', 'i', 'i'], ['0', '0', '0', '0'], ['0', '0', '0', '0']]));
    });
  });
});
