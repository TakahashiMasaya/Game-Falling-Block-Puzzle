import { Field10x20 } from '@/domain/parts/field/Field10x20';

describe('Field', () => {
  describe('ステータステスト', () => {
    it('更新すること', () => {
      const f = new Field10x20();
      f.update({
        x: 6,
        y: 5,
        tetromino: [['0', '0', 'j'], ['0', '0', 'j'], ['0', 'j', 'j']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', 'j', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });

    it('更新すること(左端1)', () => {
      const f = new Field10x20();
      f.update({
        x: 1,
        y: 5,
        tetromino: [['0', 'j'], ['0', 'j'], ['j', 'j']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', 'j', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', 'j', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', 'j', 'j', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });

    it('更新すること(左端2)', () => {
      const f = new Field10x20();
      f.update({
        x: 0,
        y: 5,
        tetromino: [['0', '0', 'j'], ['0', '0', 'j'], ['0', 'j', 'j']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', 'j', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', 'j', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', 'j', 'j', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });

    it('更新すること(右端1)', () => {
      const f = new Field10x20();
      f.update({
        x: 9,
        y: 5,
        tetromino: [['0', 'j', '0'], ['0', 'j', '0'], ['j', 'j', '0']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'j', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'j', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', 'j', 'j', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });

    it('更新すること(右端2)', () => {
      const f = new Field10x20();
      f.update({
        x: 9,
        y: 5,
        tetromino: [['0', 'j', '0'], ['0', 'j', '0'], ['j', 'j', '0']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'j', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'j', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', 'j', 'j', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });

    it('更新すること(下端)', () => {
      const f = new Field10x20();
      f.update({
        x: 5,
        y: 17,
        tetromino: [['0', 'j', '0'], ['0', 'j', '0'], ['j', 'j', '0']],
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', 'j', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', 'j', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', 'j', 'j', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });
  });
  describe('削除判定', () => {
    it('判定がfalseであること', () => {
      const f = new Field10x20();
      (f as any).status = [
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', 'j', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ];
      expect(f.canRemoveFullRow()).toEqual(false);
    });

    it('判定がfalseであること', () => {
      const f = new Field10x20();
      (f as any).status = [
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ];
      expect(f.canRemoveFullRow()).toEqual(false);
    });
    it('判定がtrueであること', () => {
      const f = new Field10x20();
      (f as any).field = [
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ];
      expect(f.canRemoveFullRow()).toEqual(true);
    });
  });

  describe('削除', () => {
    it('行を削除すること', () => {
      const f = new Field10x20();
      (f as any).field = [
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ];
      f.removeFullRow();
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });
  });

  describe('tetrimino削除数取得', () => {
    it('取得数が正しいこと', () => {
      const f = new Field10x20();
      (f as any).field = [
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', 'j', '0', '0', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'j', 'j', 'i', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ];
      expect(f.getRemoveRows()).toEqual(4);
    });
  });

  describe('文字列置換処理', () => {
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
