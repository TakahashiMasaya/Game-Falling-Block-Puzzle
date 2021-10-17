import { LTetromino } from '@/application/domain/parts/tetrominos/LTetromino';
import { Piece } from '@/type/Piece';

const pieces: Piece[] = [
  [['l', '0', '0'], ['l', '0', '0'], ['l', 'l', '0']],
  [['0', '0', '0'], ['0', '0', 'l'], ['l', 'l', 'l']],
  [['0', 'l', 'l'], ['0', '0', 'l'], ['0', '0', 'l']],
  [['l', 'l', 'l'], ['l', '0', '0'], ['0', '0', '0']],
];

describe('LTetromino', () => {
  describe('ステータステスト', () => {
    it('初期値のビットが正しいこと', () => {
      const z = new LTetromino();
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });
  describe('左回転テスト', () => {
    it('1回目回転時、pieceが正しく設定されていること', () => {
      const z = new LTetromino();
      [...new Array(1)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[1]));
    });
    it('2回目回転時、pieceが正しく設定されていること', () => {
      const z = new LTetromino();
      [...new Array(2)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[2]));
    });
    it('3回目回転時、pieceが正しく設定されていること', () => {
      const z = new LTetromino();
      [...new Array(3)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[3]));
    });
    it('4回目回転時、pieceが正しく設定されていること(初期の状態であること)', () => {
      const z = new LTetromino();
      [...new Array(4)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });
  describe('右回転テスト', () => {
    it('1回目回転時、pieceが正しく設定されていること', () => {
      const z = new LTetromino();
      [...new Array(1)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[3]));
    });
    it('2回目回転時、pieceが正しく設定されていること', () => {
      const z = new LTetromino();
      [...new Array(2)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[2]));
    });
    it('3回目回転時、pieceが正しく設定されていること', () => {
      const z = new LTetromino();
      [...new Array(3)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[1]));
    });
    it('4回目回転時、pieceが正しく設定されていること(初期の状態であること)', () => {
      const z = new LTetromino();
      [...new Array(4)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });
});
