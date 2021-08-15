import { Block } from '@/parts/block'

describe('calc', (): void => {
  test('should say hello to Tom.', (): void => {
    const block = new Block()
    const response: number = block.add(10);
    expect(response).toBe(10);
  });
})
