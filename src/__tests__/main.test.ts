import { RPN, Stack } from '../main';

describe('rpn typical', () => {
  const InitialStack: Stack = { x: '0', y: '0', z: '0', t: '0' };

  test('enter', () => {
    const r = new RPN(InitialStack);
    const result = r.enter().result();
    expect(result).toEqual(InitialStack);
  });

  test('2', () => {
    const r = new RPN(InitialStack);
    const result = r.n('2').result();
    expect(result).toEqual({ x: '2', y: '0', z: '0', t: '0' });
  });

  test('2,enter', () => {
    const r = new RPN(InitialStack);
    const result = r.n('2').enter().result();
    expect(result).toEqual({ x: '2', y: '2', z: '0', t: '0' });
  });

  test('2,enter,4', () => {
    const r = new RPN(InitialStack);
    const result = r.n('2').enter().n('4').result();
    expect(result).toEqual({ x: '4', y: '2', z: '0', t: '0' });
  });

  test('2,enter,4,+', () => {
    const r = new RPN(InitialStack);
    const result = r.n('2').enter().n('4').plus().result();
    expect(result).toEqual({ x: '6', y: '0', z: '0', t: '0' });
  });

  test('2,enter,4,+,5', () => {
    const r = new RPN(InitialStack);
    const result = r.n('2').enter().n('4').plus().n('5').result();
    expect(result).toEqual({ x: '5', y: '6', z: '0', t: '0' });
  });

  test('2,enter,4,+,5,enter', () => {
    const r = new RPN(InitialStack);
    const result = r.n('2').enter().n('4').plus().n('5').enter().result();
    expect(result).toEqual({ x: '5', y: '5', z: '6', t: '0' });
  });

  test('2,enter,4,+,5,enter,3', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('2')
      .enter()
      .n('4')
      .plus()
      .n('5')
      .enter()
      .n('3')
      .result();
    expect(result).toEqual({ x: '3', y: '5', z: '6', t: '0' });
  });

  test('2,enter,4,+,5,enter,3,-', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('2')
      .enter()
      .n('4')
      .plus()
      .n('5')
      .enter()
      .n('3')
      .minus()
      .result();
    expect(result).toEqual({ x: '2', y: '6', z: '0', t: '0' });
  });

  test('2,enter,4,+,5,enter,3,-,*', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('2')
      .enter()
      .n('4')
      .plus()
      .n('5')
      .enter()
      .n('3')
      .minus()
      .times()
      .result();
    expect(result).toEqual({ x: '12', y: '0', z: '0', t: '0' });
  });

  test('2,enter,4,+,5,enter,3,-,*,9', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('2')
      .enter()
      .n('4')
      .plus()
      .n('5')
      .enter()
      .n('3')
      .minus()
      .times()
      .n('9')
      .result();
    expect(result).toEqual({ x: '9', y: '12', z: '0', t: '0' });
  });

  test('2,enter,4,+,5,enter,3,-,*,9,enter', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('2')
      .enter()
      .n('4')
      .plus()
      .n('5')
      .enter()
      .n('3')
      .minus()
      .times()
      .n('9')
      .enter()
      .result();
    expect(result).toEqual({ x: '9', y: '9', z: '12', t: '0' });
  });

  test('2,enter,4,+,5,enter,3,-,*,9,enter,1', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('2')
      .enter()
      .n('4')
      .plus()
      .n('5')
      .enter()
      .n('3')
      .minus()
      .times()
      .n('9')
      .enter()
      .n('1')
      .result();
    expect(result).toEqual({ x: '1', y: '9', z: '12', t: '0' });
  });

  test('2,enter,4,+,5,enter,3,-,*,9,enter,1,+', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('2')
      .enter()
      .n('4')
      .plus()
      .n('5')
      .enter()
      .n('3')
      .minus()
      .times()
      .n('9')
      .enter()
      .n('1')
      .plus()
      .result();
    expect(result).toEqual({ x: '10', y: '12', z: '0', t: '0' });
  });

  test('2,enter,4,+,5,enter,3,-,*,9,enter,1,+,/', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('2')
      .enter()
      .n('4')
      .plus()
      .n('5')
      .enter()
      .n('3')
      .minus()
      .times()
      .n('9')
      .enter()
      .n('1')
      .plus()
      .div()
      .result();
    expect(result).toEqual({ x: '1.2', y: '0', z: '0', t: '0' });
  });
});

describe('rpn retain stack t', () => {
  const InitialStack: Stack = { x: '0', y: '0', z: '0', t: '0' };

  test('first', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .enter()
      .n('2')
      .enter()
      .n('3')
      .enter()
      .n('4')
      .enter()
      .n('5')
      .result();
    expect(result).toEqual({ x: '5', y: '4', z: '3', t: '2' });
  });

  test('second', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .enter()
      .n('2')
      .enter()
      .n('3')
      .enter()
      .n('4')
      .enter()
      .n('5')
      .enter()
      .result();
    expect(result).toEqual({ x: '5', y: '5', z: '4', t: '3' });
  });

  test('third', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .enter()
      .n('2')
      .enter()
      .n('3')
      .enter()
      .n('4')
      .enter()
      .n('5')
      .enter()
      .n('6')
      .result();
    expect(result).toEqual({ x: '6', y: '5', z: '4', t: '3' });
  });

  test('forth', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .enter()
      .n('2')
      .enter()
      .n('3')
      .enter()
      .n('4')
      .enter()
      .n('5')
      .enter()
      .n('6')
      .plus()
      .result();
    expect(result).toEqual({ x: '11', y: '4', z: '3', t: '3' });
  });
});

describe('modifiers', () => {
  const InitialStack: Stack = { x: '0', y: '0', z: '0', t: '0' };

  test('abs', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .period()
      .n('2')
      .enter()
      .n('3')
      .abs()
      .plus()
      .result(); // 1.2 + (-3) = -1.8
    expect(result).toEqual({ x: '-1.8', y: '0', z: '0', t: '0' });
  });

  test('abs,abs', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .period()
      .n('2')
      .enter()
      .n('3')
      .abs()
      .abs()
      .plus()
      .result(); // 1.2 + 3 = 4.2
    expect(result).toEqual({ x: '4.2', y: '0', z: '0', t: '0' });
  });

  test('period', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .period()
      .n('2')
      .enter()
      .n('3')
      .period()
      .n('1')
      .n('4')
      .plus()
      .result(); // 1.2 + 3.14 = 4.34
    expect(result).toEqual({ x: '4.34', y: '0', z: '0', t: '0' });
  });

  test('duplicate period', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .period()
      .n('2')
      .enter()
      .n('3')
      .period()
      .n('1')
      .period()
      .n('4')
      .period()
      .plus()
      .result(); // 1.2 + 3.14 = 4.34
    expect(result).toEqual({ x: '4.34', y: '0', z: '0', t: '0' });
  });

  test('abs and period', () => {
    const r = new RPN(InitialStack);
    const result = r
      .n('1')
      .period()
      .n('2')
      .abs()
      .enter()
      .n('3')
      .period()
      .n('1')
      .n('4')
      .abs()
      .plus()
      .result(); // -1.2 + (-3.14) = -4.34
    expect(result).toEqual({ x: '-4.34', y: '0', z: '0', t: '0' });
  });

  test('period first', () => {
    const r = new RPN(InitialStack);
    const result = r.period().n('1').n('2').enter().result();
    expect(result).toEqual({ x: '0.12', y: '0.12', z: '0', t: '0' });
  });

  test('abs period', () => {
    const r = new RPN(InitialStack);
    const result = r.abs().period().n('1').n('2').enter().result();
    expect(result).toEqual({ x: '0.12', y: '0.12', z: '0', t: '0' });
  });

  test('abs period 2', () => {
    const r = new RPN(InitialStack);
    const result = r.n('1').abs().period().n('2').result();
    expect(result).toEqual({ x: '-1.2', y: '0', z: '0', t: '0' });
  });

  test('swap', () => {
    const r = new RPN(InitialStack);
    const result = r.n('1').enter().n('2').swap().result();
    expect(result).toEqual({ x: '1', y: '2', z: '0', t: '0' });
  });

  test('swap,swap', () => {
    const r = new RPN(InitialStack);
    const result = r.n('1').enter().n('2').swap().swap().result();
    expect(result).toEqual({ x: '2', y: '1', z: '0', t: '0' });
  });

  test('backspace', () => {
    const r = new RPN(InitialStack);
    const result = r.n('1').n('2').n('3').backspace().result();
    expect(result).toEqual({ x: '12', y: '0', z: '0', t: '0' });
  });

  test('backspace,backspace', () => {
    const r = new RPN(InitialStack);
    const result = r.n('1').n('2').n('3').backspace().backspace().result();
    expect(result).toEqual({ x: '1', y: '0', z: '0', t: '0' });
  });

  test('clear', () => {
    const r = new RPN(InitialStack);
    const result = r.n('1').n('2').n('3').enter().clear().result();
    expect(result).toEqual({ x: '0', y: '0', z: '0', t: '0' });
  });
});
