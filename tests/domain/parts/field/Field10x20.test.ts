import { Field10x20 } from '@/domain/parts/field/Field10x20';

describe('Field', () => {
  describe('ステータステスト', () => {
    it('更新すること', () => {
      const f = new Field10x20();
      f.update({
        x: 5,
        y: 5,
        tetromino: [['0', '0', 'j'], ['0', '0', 'j'], ['0', 'j', 'j']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', 'j', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ]));
    });

    it('更新すること(左端)', () => {
      const f = new Field10x20();
      f.update({
        x: 0,
        y: 5,
        tetromino: [['0', 'j'], ['0', 'j'], ['j', 'j']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'j', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'j', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['j', 'j', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ]));
    });

    it('更新すること(右端)', () => {
      const f = new Field10x20();
      f.update({
        x: 8,
        y: 5,
        tetromino: [['0', 'j', '0'], ['0', 'j', '0'], ['j', 'j', '0']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'j'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'j'],
        ['0', '0', '0', '0', '0', '0', '0', '0', 'j', 'j'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ]));
    });
  });
  describe('削除判定', () => {
    it('判定がfalseであること', () => {
      const f = new Field10x20();
      (f as any).status = [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', 'j', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ];
      expect(f.canRemoveFullRow()).toEqual(false);
    });

    it('判定がfalseであること', () => {
      const f = new Field10x20();
      (f as any).status = [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ];
      expect(f.canRemoveFullRow()).toEqual(false);
    });
    it('判定がtrueであること', () => {
      const f = new Field10x20();
      (f as any).field = [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ];
      expect(f.canRemoveFullRow()).toEqual(true);
    });
  });

  describe('削除', () => {
    it('削除できる行を削除すること', () => {
      const f = new Field10x20();
      (f as any).field = [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i'],
        ['i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i'],
        ['i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
      ];
      f.removeFullRow();
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', 'j', '0', '0'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
        ['i', '0', '0', '0', '0', '0', '0', '0', '0', 'i'],
      ]));
    });
  });

  describe('文字列置換処理', () => {
    it('文字列が所定位置で置換できること', () => {
      const f = new Field10x20();
      const str = (f as any).replaceBitString('00000000', '1111', 0);
      expect(str).toEqual('11110000');
    });
    it('文字列が所定位置で置換できること', () => {
      const f = new Field10x20();
      const str = (f as any).replaceBitString('00000000', '1111', 3);
      expect(str).toEqual('00011110');
    });
    it('文字列が所定位置で置換できること', () => {
      const f = new Field10x20();
      const str = (f as any).replaceBitString('00000000', '1111', 7);
      expect(str).toEqual('00000001');
    });
  });
});
