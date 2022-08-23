import { abs, div, minus, plus, times } from '../op';

describe('plus', () => {
  test('1 + 2 = 3', () => {
    const result = plus('1', '2');
    expect(result).toBe('3');
  });

  test('140 + 201 = 341', () => {
    const result = plus('140', '201');
    expect(result).toBe('341');
  });

  test('1.40 + 2.01 = 3.41', () => {
    const result = plus('1.40', '2.01');
    expect(result).toBe('3.41');
  });

  test('-1.40 + 2.01 = 0.61', () => {
    const result = plus('-1.40', '2.01');
    expect(result).toBe('0.61');
  });
});

describe('minus', () => {
  test('3 - 2 = 1', () => {
    const result = minus('3', '2');
    expect(result).toBe('1');
  });

  test('201 - 140 = 61', () => {
    const result = minus('201', '140');
    expect(result).toBe('61');
  });

  test('140 - 201 = -61', () => {
    const result = minus('140', '201');
    expect(result).toBe('-61');
  });

  test('-1.40 - 2.01 = -3.41', () => {
    const result = minus('-1.40', '2.01');
    expect(result).toBe('-3.41');
  });
});

describe('times', () => {
  test('3 * 2 = 6', () => {
    const result = times('3', '2');
    expect(result).toBe('6');
  });

  test('201 * 140 = 28140', () => {
    const result = times('201', '140');
    expect(result).toBe('28140');
  });

  test('140 * -201 = -28140', () => {
    const result = times('140', '-201');
    expect(result).toBe('-28140');
  });

  test('-1.40 * -2.01 = 2.814', () => {
    const result = times('-1.40', '-2.01');
    expect(result).toBe('2.814');
  });
});

describe('div', () => {
  test('3 / 2 = 1.5', () => {
    const result = div('3', '2');
    expect(result).toBe('1.5');
  });

  test('201 / 140 = 1.43571428571428571429', () => {
    const result = div('201', '140');
    expect(result).toBe('1.43571428571428571429');
  });

  test('140 / -201 = -0.69651741293532338308', () => {
    const result = div('140', '-201');
    expect(result).toBe('-0.69651741293532338308');
  });

  test('-1.40 / -2.01 = 0.69651741293532338308', () => {
    const result = div('-1.40', '-2.01');
    expect(result).toBe('0.69651741293532338308');
  });
});

describe('abs', () => {
  test('abs -3 = 3', () => {
    const result = abs('-3');
    expect(result).toBe('3');
  });

  test('abs 5 = -5', () => {
    const result = abs('5');
    expect(result).toBe('-5');
  });
});
