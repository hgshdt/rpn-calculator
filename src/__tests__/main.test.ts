import { Stack, rpnCalc } from '../main';

const InitialStack: Stack = { x: '0', y: '0', z: '0', t: '0' };

describe('normal', () => {
  test('enter', () => {
    const result = rpnCalc('enter', InitialStack);
    expect(result).toEqual(InitialStack);
  });
  test('1', () => {
    const result = rpnCalc('1', InitialStack);
    expect(result).toEqual({ x: '1', y: '0', z: '0', t: '0' });
  });
  test('1,2', () => {
    let result = rpnCalc('1', InitialStack);
    result = rpnCalc('2', result);
    expect(result).toEqual({ x: '12', y: '0', z: '0', t: '0' });
  });
  test('1,2,enter', () => {
    let result = rpnCalc('1', InitialStack);
    result = rpnCalc('2', result);
    result = rpnCalc('enter', result);
    expect(result).toEqual({ x: '0', y: '12', z: '0', t: '0' });
  });
  test('1,2,enter,3', () => {
    let result = rpnCalc('1', InitialStack);
    result = rpnCalc('2', result);
    result = rpnCalc('enter', result);
    result = rpnCalc('3', result);
    expect(result).toEqual({ x: '3', y: '12', z: '0', t: '0' });
  });
  test('1,2,enter,3,+', () => {
    let result = rpnCalc('1', InitialStack);
    result = rpnCalc('2', result);
    result = rpnCalc('enter', result);
    result = rpnCalc('3', result);
    result = rpnCalc('+', result);
    expect(result).toEqual({ x: '15', y: '0', z: '0', t: '0' });
  });
});
