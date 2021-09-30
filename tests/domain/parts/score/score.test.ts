import { Score } from '@/domain/parts/score/Score';

describe('Score', () => {
  it('加算されること', () => {
    const s = new Score();
    s.add(10);
    expect(s.get()).toBe(10);
  });
  it('0にリセットすること', () => {
    const s = new Score();
    s.add(10);
    s.reset();
    expect(s.get()).toBe(0);
  });
});
