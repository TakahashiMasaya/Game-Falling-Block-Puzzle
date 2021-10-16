import { InteractiveController } from '@/application/interactor/InteractiveController';

describe('InteractiveController', () => {
  describe('up()', () => {
    it('呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.up();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: true,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
    it('off 呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.up();
      ic.offUp();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
  });
  describe('right()', () => {
    it('呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.right();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: true,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
    it('off 呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.right();
      ic.offRight();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
  });
  describe('down()', () => {
    it('呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.down();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: true,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
    it('off 呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.down();
      ic.offDown();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
  });
  describe('left()', () => {
    it('呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.left();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: true,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
    it('off 呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.left();
      ic.offLeft();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
  });
  describe('spinLeft()', () => {
    it('呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.spinLeft();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: true,
        enter: false,
      }));
    });
    it('off 呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.spinLeft();
      ic.offSpinLeft();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
  });
  describe('spinRight()', () => {
    it('呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.spinRight();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: true,
        spinLeft: false,
        enter: false,
      }));
    });
    it('off 呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.spinRight();
      ic.offSpinRight();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
  });
  describe('enter()', () => {
    it('呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.enter();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: true,
      }));
    });
    it('off 呼び出し後のステータスが正しいこと', () => {
      const ic = new InteractiveController();
      ic.enter();
      ic.offEnter();
      expect(ic.keyStatus()).toEqual(expect.objectContaining({
        up: false,
        right: false,
        down: false,
        left: false,
        spinRight: false,
        spinLeft: false,
        enter: false,
      }));
    });
  });
});
