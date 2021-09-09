import { TTetromino } from '@/domain/parts/tetrominos/TTetromino';
import { Piece } from '@/type/Piece';

const pieces: Piece[] = [
  [['0', '0', '0'], ['t', 't', 't'], ['0', 't', '0']],
  [['t', '0', '0'], ['t', 't', '0'], ['t', '0', '0']],
  [['0', '0', '0'], ['0', 't', '0'], ['t', 't', 't']],
  [['0', '0', 't'], ['0', 't', 't'], ['0', '0', 't']],
];

describe('TTetromino', () => {
  describe('ステータステスト', () => {
    it('初期値のビットが正しいこと', () => {
      const z = new TTetromino();
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });
  describe('左回転テスト', () => {
    it('1回目回転時、pieceが正しく設定されていること', () => {
      const z = new TTetromino();
      [...new Array(1)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[1]));
    });
    it('2回目回転時、pieceが正しく設定されていること', () => {
      const z = new TTetromino();
      [...new Array(2)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[2]));
    });
    it('3回目回転時、pieceが正しく設定されていること', () => {
      const z = new TTetromino();
      [...new Array(3)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[3]));
    });
    it('4回目回転時、pieceが正しく設定されていること(初期の状態であること)', () => {
      const z = new TTetromino();
      [...new Array(4)].forEach(() => z.spinLeft());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });
  describe('右回転テスト', () => {
    it('1回目回転時、pieceが正しく設定されていること', () => {
      const z = new TTetromino();
      [...new Array(1)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[3]));
    });
    it('2回目回転時、pieceが正しく設定されていること', () => {
      const z = new TTetromino();
      [...new Array(2)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[2]));
    });
    it('3回目回転時、pieceが正しく設定されていること', () => {
      const z = new TTetromino();
      [...new Array(3)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[1]));
    });
    it('4回目回転時、pieceが正しく設定されていること(初期の状態であること)', () => {
      const z = new TTetromino();
      [...new Array(4)].forEach(() => z.spinRight());
      expect(z.getPiece()).toEqual(expect.arrayContaining(pieces[0]));
    });
  });

  describe('左回転ステータス取得テスト', () => {
    it('現在の状態から左回転のpieceが取得できること', () => {
      const z = new TTetromino();
      expect(z.getPieceToSpinLeft()).toEqual(expect.arrayContaining(pieces[1]));
    });
  });
  describe('右回転ステータス取得テスト', () => {
    it('現在の状態から右回転のpieceが取得できること', () => {
      const z = new TTetromino();
      expect(z.getPieceToSpinRight()).toEqual(expect.arrayContaining(pieces[3]));
    });
  });
});
