import { TransferredScreen } from '@/application/application/TransferredScreen';
import { paramTransfers } from '@/type/Application';

describe('TransferredScreen', () => {
  it('init 縦長画面にて、引数・比率が正しくセットされていること', () => {
    const ts = new TransferredScreen({
      window: { width: 200, height: 300 },
      screen: { width: 400, height: 500 },
    });
    expect((ts as any).window).toEqual({ width: 200, height: 300 });
    expect((ts as any).screen).toEqual({ width: 400, height: 500 });
    expect((ts as any).rate).toEqual(0.5);
  });
  it('init 横長画面にて、引数・比率が正しくセットされていること', () => {
    const ts = new TransferredScreen({
      window: { width: 300, height: 200 },
      screen: { width: 400, height: 500 },
    });
    expect((ts as any).window).toEqual({ width: 300, height: 200 });
    expect((ts as any).screen).toEqual({ width: 400, height: 500 });
    expect((ts as any).rate).toEqual(0.4);
  });

  it('rotate時、windowサイズ、比率が正しくセットされていること', () => {
    const ts = new TransferredScreen({
      window: { width: 200, height: 300 },
      screen: { width: 400, height: 500 },
    });
    ts.resizeWindow({
      width: 300,
      height: 200,
    });
    expect((ts as any).window).toEqual({ width: 300, height: 200 });
    expect((ts as any).screen).toEqual({ width: 400, height: 500 });
    expect((ts as any).rate).toEqual(0.4);
  });

  it('rotate時、windowサイズ、比率が正しくセットされていること', () => {
    const ts = new TransferredScreen({
      window: { width: 200, height: 300 },
      screen: { width: 500, height: 400 },
    });
    ts.resizeWindow({
      width: 300,
      height: 200,
    });
    expect((ts as any).window).toEqual({ width: 300, height: 200 });
    expect((ts as any).screen).toEqual({ width: 500, height: 400 });
    expect((ts as any).rate).toEqual(0.5);
  });

  describe('transfer', () => {
    const data = {
      x: 10, y: 20, width: 50, height: 50,
    };
    it('位置が正しく変換されていること (rate: 1/5)', () => {
      const ts = new TransferredScreen({
        window: { width: 200, height: 250 },
        screen: { width: 400, height: 1250 },
      });
      const tf = ts.transfer(data);
      expect((ts as any).rate).toEqual(0.2);
      expect(tf).toEqual({
        x: 2, y: 4, width: 10, height: 10,
      });
    });
    it('位置が正しく変換されていること (rotate後 rate: 1/5)', () => {
      const ts = new TransferredScreen({
        window: { width: 200, height: 250 },
        screen: { width: 400, height: 1000 },
      });
      ts.resizeWindow({
        width: 250,
        height: 200,
      });
      const tf = ts.transfer(data);
      expect((ts as any).rate).toEqual(0.2);
      expect(tf).toEqual({
        x: 2, y: 4, width: 10, height: 10,
      });
    });
  });

  describe('transfers', () => {
    let data: paramTransfers = [];
    beforeEach(() => {
      data = [
        {
          x: 10, y: 20, width: 50, height: 50,
        },
        {
          x: 30, y: 30, width: 80, height: 90,
        },
      ];
    });
    it('位置が正しく変換されていること (rate: 1/5)', () => {
      const ts = new TransferredScreen({
        window: { width: 200, height: 250 },
        screen: { width: 400, height: 1250 },
      });
      const tf = ts.transfers(data);
      expect((ts as any).rate).toEqual(0.2);
      expect(tf).toEqual([
        {
          x: 2, y: 4, width: 10, height: 10,
        },
        {
          x: 6, y: 6, width: 16, height: 18,
        },
      ]);
    });
    it('位置が正しく変換されていること (rotate後 rate: 1/5)', () => {
      const ts = new TransferredScreen({
        window: { width: 200, height: 250 },
        screen: { width: 400, height: 1000 },
      });
      ts.resizeWindow({
        width: 250,
        height: 200,
      });
      const tf = ts.transfers(data);
      expect((ts as any).rate).toEqual(0.2);
      expect(tf).toEqual([
        {
          x: 2, y: 4, width: 10, height: 10,
        },
        {
          x: 6, y: 6, width: 16, height: 18,
        },
      ]);
    });
  });
});
