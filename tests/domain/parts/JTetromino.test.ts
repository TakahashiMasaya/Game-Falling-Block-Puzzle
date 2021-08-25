import { JTetromino } from '@/tetromino/JTetromino';
import { Piece } from '@/type/Piece';

const pieces: Piece[] = [
  [['', '', 'j'], ['', '', 'j'], ['', 'j', 'j']],
  [['j', 'j', 'j'], ['', '', 'j'], ['', '', '']],
  [['j', 'j', ''], ['j', '', ''], ['j', '', '']],
  [['', '', ''], ['j', '', ''], ['j', 'j', 'j']],
];

describe('JTetromino', () => {
  describe('ステータステスト', () => {
    it('初期値のビットが正しいこと', () => {
      const z = new JTetromino();
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });
  describe('左回転テスト', () => {
    it('1回目回転時、pieceが正しく設定されていること', () => {
      const z = new JTetromino();
      [...new Array(1)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[1]));
    });
    it('2回目回転時、pieceが正しく設定されていること', () => {
      const z = new JTetromino();
      [...new Array(2)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[2]));
    });
    it('3回目回転時、pieceが正しく設定されていること', () => {
      const z = new JTetromino();
      [...new Array(3)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[3]));
    });
    it('4回目回転時、pieceが正しく設定されていること(初期の状態であること)', () => {
      const z = new JTetromino();
      [...new Array(4)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });
  describe('右回転テスト', () => {
    it('1回目回転時、pieceが正しく設定されていること', () => {
      const z = new JTetromino();
      [...new Array(1)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[3]));
    });
    it('2回目回転時、pieceが正しく設定されていること', () => {
      const z = new JTetromino();
      [...new Array(2)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[2]));
    });
    it('3回目回転時、pieceが正しく設定されていること', () => {
      const z = new JTetromino();
      [...new Array(3)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[1]));
    });
    it('4回目回転時、pieceが正しく設定されていること(初期の状態であること)', () => {
      const z = new JTetromino();
      [...new Array(4)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });
});
