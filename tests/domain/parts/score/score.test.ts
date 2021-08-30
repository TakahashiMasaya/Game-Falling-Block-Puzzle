import { Score } from '@/domain/parts/score/Score';

describe('Score', () => {
  it('加算が正しいこと', () => {
    const s = new Score();
    s.add(10);
    expect((s as any).score).toBe(10);
  });
  it('0にリセットすること', () => {
    const s = new Score();
    s.add(10);
    s.reset();
    expect((s as any).score).toBe(0);
  });
});
