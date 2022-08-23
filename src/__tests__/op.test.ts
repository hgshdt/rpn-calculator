import { plus } from '../op';

describe('plus', () => {
  test('1 + 2 = 3', () => {
    const result = plus('1', '2');
    expect(result).toBe('3');
  });

  test('140 + 201 = 341', () => {
    const result = plus('140', '201');
    expect(result).toBe('341');
  });
});
