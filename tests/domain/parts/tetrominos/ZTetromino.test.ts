import { ZTetromino } from '@/domain/parts/tetrominos/ZTetromino';

describe('ZTetromino', () => {
  describe('ステータステスト', () => {
    it('初期値のビットが正しいこと', () => {
      const z = new ZTetromino();
      expect(z.getPiece()).toEqual(expect.arrayContaining([['z', 'z', ''], ['', 'z', 'z'], ['', '', '']]));
    });
  });
  describe('左回転テスト', () => {
    it('1回目回転時、pieceが正しく設定されていること', () => {
      const z = new ZTetromino();
      [...new Array(1)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining([['', 'z', ''], ['z', 'z', ''], ['z', '', '']]));
    });
    it('2回目回転時、pieceが正しく設定されていること', () => {
      const z = new ZTetromino();
      [...new Array(2)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining([['', '', ''], ['', 'z', 'z'], ['z', 'z', '']]));
    });
    it('3回目回転時、pieceが正しく設定されていること', () => {
      const z = new ZTetromino();
      [...new Array(3)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining([['', 'z', ''], ['', 'z', 'z'], ['', '', 'z']]));
    });
    it('4回目回転時、pieceが正しく設定されていること(初期の状態であること)', () => {
      const z = new ZTetromino();
      [...new Array(4)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining([['z', 'z', ''], ['', 'z', 'z'], ['', '', '']]));
    });
  });
  describe('右回転テスト', () => {
    it('1回目回転時、pieceが正しく設定されていること', () => {
      const z = new ZTetromino();
      [...new Array(1)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining([['', 'z', ''], ['', 'z', 'z'], ['', '', 'z']]));
    });
    it('2回目回転時、pieceが正しく設定されていること', () => {
      const z = new ZTetromino();
      [...new Array(2)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining([['', '', ''], ['', 'z', 'z'], ['z', 'z', '']]));
    });
    it('3回目回転時、pieceが正しく設定されていること', () => {
      const z = new ZTetromino();
      [...new Array(3)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining([['', 'z', ''], ['z', 'z', ''], ['z', '', '']]));
    });
    it('4回目回転時、pieceが正しく設定されていること(初期の状態であること)', () => {
      const z = new ZTetromino();
      [...new Array(4)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining([['z', 'z', ''], ['', 'z', 'z'], ['', '', '']]));
    });
  });
});
