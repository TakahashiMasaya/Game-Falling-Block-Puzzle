import { TransferredController } from '@/application/TransferredController';
import { InteractiveController } from '@/interactor/InteractiveController';

describe('TransferredController', () => {
  describe('各種ボタンのステータス確認', () => {
    let ic = null;
    let tc = null;
    beforeEach(() => {
      ic = new InteractiveController();
      tc = new TransferredController({
        interactiveController: ic,
      });
    });
    it('leftボタンが設定されること', () => {
      ic.left();
      tc.transfer();
      expect((tc as any).status.left).toEqual(1);
      ic.left();
      tc.transfer();
      expect((tc as any).status.left).toEqual(2);
      ic.offLeft();
      tc.transfer();
      expect((tc as any).status.left).toEqual(0);
    });

    it('rightボタンが設定されること', () => {
      ic.right();
      tc.transfer();
      expect((tc as any).status.right).toEqual(1);
      ic.right();
      tc.transfer();
      expect((tc as any).status.right).toEqual(2);
      ic.offRight();
      tc.transfer();
      expect((tc as any).status.right).toEqual(0);
    });

    it('downボタンが設定されること', () => {
      ic.down();
      tc.transfer();
      expect((tc as any).status.down).toEqual(1);
      ic.down();
      tc.transfer();
      expect((tc as any).status.down).toEqual(2);
      ic.offDown();
      tc.transfer();
      expect((tc as any).status.down).toEqual(0);
    });

    it('upボタンが設定されること', () => {
      ic.up();
      tc.transfer();
      expect((tc as any).status.up).toEqual(1);
      ic.up();
      tc.transfer();
      expect((tc as any).status.up).toEqual(2);
      ic.offUp();
      tc.transfer();
      expect((tc as any).status.up).toEqual(0);
    });

    it('enterボタンが設定されること', () => {
      ic.enter();
      tc.transfer();
      expect((tc as any).status.enter).toEqual(1);
      ic.enter();
      tc.transfer();
      expect((tc as any).status.enter).toEqual(2);
      ic.offEnter();
      tc.transfer();
      expect((tc as any).status.enter).toEqual(0);
    });

    it('spinLeftボタンが設定されること', () => {
      ic.spinLeft();
      tc.transfer();
      expect((tc as any).status.spinLeft).toEqual(1);
      ic.spinLeft();
      tc.transfer();
      expect((tc as any).status.spinLeft).toEqual(2);
      ic.offSpinLeft();
      tc.transfer();
      expect((tc as any).status.spinLeft).toEqual(0);
    });

    it('spinRightボタンが設定されること', () => {
      ic.spinRight();
      tc.transfer();
      expect((tc as any).status.spinRight).toEqual(1);
      ic.spinRight();
      tc.transfer();
      expect((tc as any).status.spinRight).toEqual(2);
      ic.offSpinRight();
      tc.transfer();
      expect((tc as any).status.spinRight).toEqual(0);
    });
  });

  describe('連射・単射確認', () => {
    let ic = null;
    let tc = null;
    beforeEach(() => {
      ic = new InteractiveController();
      tc = new TransferredController({
        interactiveController: ic,
      });
    });
    it('連射であること（一定間隔でtrueであること）', () => {
      for (let i = 0; i < 20; i += 1) {
        ic.left();
        tc.transfer();
        expect(tc.getStatus().left).toEqual((i % 5 === 0));
      }

      for (let i = 0; i < 20; i += 1) {
        ic.right();
        tc.transfer();
        expect(tc.getStatus().right).toEqual((i % 5 === 0));
      }

      for (let i = 0; i < 20; i += 1) {
        ic.down();
        tc.transfer();
        expect(tc.getStatus().down).toEqual((i % 5 === 0));
      }
    });
    it('単射であること', () => {
      for (let i = 0; i < 20; i += 1) {
        ic.up();
        tc.transfer();
        expect(tc.getStatus().up).toEqual((i === 0));
      }

      for (let i = 0; i < 20; i += 1) {
        ic.enter();
        tc.transfer();
        expect(tc.getStatus().enter).toEqual((i === 0));
      }

      for (let i = 0; i < 20; i += 1) {
        ic.spinRight();
        tc.transfer();
        expect(tc.getStatus().spinRight).toEqual((i === 0));
      }

      for (let i = 0; i < 20; i += 1) {
        ic.spinLeft();
        tc.transfer();
        expect(tc.getStatus().spinLeft).toEqual((i === 0));
      }
    });
  });
});
