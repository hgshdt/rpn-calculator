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
