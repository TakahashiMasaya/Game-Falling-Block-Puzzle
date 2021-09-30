import { NextTetrominos } from '@/application/NextTetrominos';

describe('NextTetrominos', () => {
  it('指定引数が正しくセットされていること', () => {
    const nt = new NextTetrominos({
      stockQuantity: 4,
      tetrominoQuantity: 7,
    });
    expect((nt as any).stockQuantity).toEqual(4);
    expect((nt as any).tetrominoQuantity).toEqual(7);
  });
  it('テトリスが初期値数分ストックできること', () => {
    const nt = new NextTetrominos({
      stockQuantity: 4,
      tetrominoQuantity: 7,
    });
    const list: number[] = nt.getList();
    expect(list.length).toEqual(4);
  });
  it('リストの先頭を取得できること、リストの要素が変わらないこと', () => {
    const nt = new NextTetrominos({
      stockQuantity: 4,
      tetrominoQuantity: 7,
    });
    const next = nt.next();
    const list: number[] = nt.getList();
    expect(next).toBeLessThan(7);
    expect(list.length).toEqual(4);
  });
});
