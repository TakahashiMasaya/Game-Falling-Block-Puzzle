import { ActiveTetromino } from '@/domain/parts/tetrominos/ActiveTetromino';
import { Field10x20 } from '@/domain/parts/field/Field10x20';
import { CollisionalDetector } from '@/application/CollisionalDetector';

type tct = CollisionalDetector | null;
describe('CollisionalDetector', () => {
  describe('fieldの衝突確認', () => {
    describe('左衝突確認', () => {
      let ct: tct = null;
      const field = [
        ['1', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '1'],
      ];
      beforeEach(() => {
        ct = new CollisionalDetector();
      });
      it('衝突と判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 0,
            y: 0,
            tetromino: [
              ['i', '0', '0'],
              ['0', '0', '0'],
            ],
          },
          field,
        })).toEqual(true);
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: -1,
            y: 0,
            tetromino: [
              ['0', 'i', '0'],
              ['0', '0', '0'],
            ],
          },
          field,
        })).toEqual(true);
      });
      it('衝突しないと判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: -1,
            y: 0,
            tetromino: [
              ['0', '0', '0'],
              ['0', '0', '0'],
            ],
          },
          field,
        })).toEqual(false);
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: -1,
            y: 0,
            tetromino: [
              ['i', '0', 'i'],
              ['i', '0', 'i'],
            ],
          },
          field,
        })).toEqual(false);
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: -2,
            y: 0,
            tetromino: [
              ['i', 'i', '0'],
              ['i', 'i', '0'],
            ],
          },
          field,
        })).toEqual(false);
      });
    });
    describe('右衝突確認', () => {
      let ct: tct = null;
      const field = [
        ['1', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '1'],
      ];
      beforeEach(() => {
        ct = new CollisionalDetector();
      });
      it('衝突と判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 4,
            y: 0,
            tetromino: [
              ['0', 'i'],
              ['0', '1'],
            ],
          },
          field,
        })).toEqual(true);
      });
      it('衝突しないと判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 4,
            y: 0,
            tetromino: [
              ['1', '0', '0'],
              ['1', '0', '0'],
            ],
          },
          field,
        })).toEqual(false);
      });
    });
    describe('下衝突確認', () => {
      let ct: tct = null;
      const field = [
        ['1', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1'],
      ];
      beforeEach(() => {
        ct = new CollisionalDetector();
      });
      it('衝突と判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 1,
            y: 2,
            tetromino: [
              ['i', '0', '0'],
              ['i', '0', '0'],
            ],
          },
          field,
        })).toEqual(true);
      });
      it('衝突しないと判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 1,
            y: 0,
            tetromino: [
              ['i', '0', '0'],
              ['i', '0', '0'],
            ],
          },
          field,
        })).toEqual(false);
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 1,
            y: 1,
            tetromino: [
              ['i', '0', '0'],
              ['i', '0', '0'],
            ],
          },
          field,
        })).toEqual(false);
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 1,
            y: 2,
            tetromino: [
              ['i', '0', '0'],
              ['0', '0', '0'],
            ],
          },
          field,
        })).toEqual(false);
      });
    });
  });

  describe('pieceによる衝突確認', () => {
    let ct: tct = null;
    const field = [
      ['0', '0', '0', '0', '0', '0'],
      ['0', 'j', '0', '0', 'j', '0'],
      ['0', 'j', '0', '0', 'j', '0'],
      ['0', 'j', 'l', 'l', 'l', '0'],
    ];
    beforeEach(() => {
      ct = new CollisionalDetector();
    });
    it('衝突と判断すること', () => {
      expect((ct as any).isFieldCollision({
        tetromino: {
          x: 1,
          y: 0,
          tetromino: [
            ['i', 'i'],
            ['i', 'i'],
          ],
        },
        field,
      })).toEqual(true);
    });

    it('衝突しないと判断すること', () => {
      expect((ct as any).isFieldCollision({
        tetromino: {
          x: 2,
          y: 0,
          tetromino: [
            ['i', 'i'],
            ['i', 'i'],
          ],
        },
        field,
      })).toEqual(false);

      expect((ct as any).isFieldCollision({
        tetromino: {
          x: 1,
          y: 0,
          tetromino: [
            ['0', 'i', 'i', '0'],
            ['0', 'i', 'i', '0'],
            ['0', '0', '0', '0'],
          ],
        },
        field,
      })).toEqual(false);
    });

    describe('左端境界テスト', () => {
      it('衝突と判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 0,
            y: 0,
            tetromino: [
              ['0', 'i'],
              ['0', 'i'],
            ],
          },
          field,
        })).toEqual(true);

        expect((ct as any).isFieldCollision({
          tetromino: {
            x: -1,
            y: 0,
            tetromino: [
              ['0', '0', 'i'],
              ['0', '0', 'i'],
            ],
          },
          field,
        })).toEqual(true);
      });
    });
    describe('右端境界テスト', () => {
      it('衝突と判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 3,
            y: 0,
            tetromino: [
              ['0', 'i'],
              ['0', 'i'],
            ],
          },
          field,
        })).toEqual(true);

        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 2,
            y: 0,
            tetromino: [
              ['0', '0', 'i'],
              ['0', '0', 'i'],
            ],
          },
          field,
        })).toEqual(true);
      });
      it('衝突しないと判断すること', () => {
        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 5,
            y: 0,
            tetromino: [
              ['i', '0'],
              ['i', '0'],
            ],
          },
          field,
        })).toEqual(false);

        expect((ct as any).isFieldCollision({
          tetromino: {
            x: 3,
            y: 0,
            tetromino: [
              ['i', 'i', 'i'],
              ['i', '0', '0'],
            ],
          },
          field,
        })).toEqual(false);
      });
    });
  });

  describe('fieldによる衝突判定', () => {
    const f = new Field10x20();
    beforeEach(() => {
      (f as any).field = [
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
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ];
    });
    it('左衝突とその位置が正しいこと', () => {
      // 左に遷移する状態
      const ct = new CollisionalDetector();
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      let collision: boolean = false;
      for (let i = 0; i < 5; i += 1) {
        collision = ct.isCollision({
          tetromino: at.nextAction({
            left: true,
            right: false,
            down: false,
            spinLeft: false,
            spinRight: false,
          }),
          field: f.getStatus(),
        });
        if (!collision) {
          at.setAction({
            left: true,
            right: false,
            down: false,
            spinLeft: false,
            spinRight: false,
          });
        }
      }
      const { x, y, tetromino } = at.getStatus();
      f.update({
        x,
        y,
        tetromino,
      });
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', 'i', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
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
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });

    it('右衝突とその位置が正しいこと', () => {
      const ct = new CollisionalDetector();
      const at = new ActiveTetromino();
      at.start({ x: 4, y: 0, tetromino: 0 });
      let collision: boolean = false;
      for (let i = 0; i < 10; i += 1) {
        collision = ct.isCollision({
          tetromino: at.nextAction({
            left: false,
            right: true,
            down: false,
            spinLeft: false,
            spinRight: false,
          }),
          field: f.getStatus(),
        });
        if (!collision) {
          at.setAction({
            left: false,
            right: true,
            down: false,
            spinLeft: false,
            spinRight: false,
          });
        }
      }
      f.update(at.getStatus());
      expect(f.getStatus()).toEqual(expect.arrayContaining([
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'i', '1'],
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
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ]));
    });
  });

  describe('フィールドにブロックが存在している状態からの衝突判定', () => {
    let field: string[][] = [];
    beforeEach(() => {
      field = [
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
        ['1', '0', '0', '0', '0', '0', '0', '0', 'z', 'z', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', 'z', 'z', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ];
    });
    it('衝突と判断すること', () => {
      const ct = new CollisionalDetector();
      expect((ct as any).isFieldCollision({
        tetromino: {
          x: 6,
          y: 15,
          tetromino: [
            ['0', '0', '0'],
            ['0', 't', '0'],
            ['t', 't', 't'],
          ],
        },
        field,
      })).toEqual(true);
    });
    it('衝突でないと判断すること', () => {
      const ct = new CollisionalDetector();
      expect((ct as any).isFieldCollision({
        tetromino: {
          x: 8,
          y: 14,
          tetromino: [
            ['0', '0', '0'],
            ['0', 't', '0'],
            ['t', 't', 't'],
          ],
        },
        field,
      })).toEqual(false);
    });
  });
});
