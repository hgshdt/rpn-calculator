import { abs, div, minus, plus, times } from './op';

export type Stack = {
  t: string;
  z: string;
  y: string;
  x: string;
};

export type Input =
  | 'enter'
  | 'abs'
  | 'swap'
  | 'backspace'
  | '7'
  | '8'
  | '9'
  | '/'
  | '4'
  | '5'
  | '6'
  | '*'
  | '1'
  | '2'
  | '3'
  | '-'
  | 'clear'
  | '0'
  | '.'
  | '+';

export const rpnCalc = (input: Input, current: Stack): Stack => {
  let result = { ...current };

  if (
    current.x.length < 1 ||
    current.y.length < 1 ||
    current.z.length < 1 ||
    current.t.length < 1
  )
    return result;

  switch (input) {
    case 'enter':
      result = { x: '0', y: current.x, z: current.y, t: current.z };
      break;
    case 'abs':
      result = { ...current, x: abs(current.x) };
      break;
    case 'swap':
      result = { ...current, x: current.y, y: current.x };
      break;
    case 'backspace':
      result = {
        ...current,
        x: current.x.length === 1 ? '0' : current.x.slice(0, -1),
      };
      break;
    case '/':
      result = {
        x: div(current.y, current.x),
        y: current.z,
        z: current.t,
        t: '0',
      };
      break;
    case '*':
      result = {
        x: times(current.y, current.x),
        y: current.z,
        z: current.t,
        t: '0',
      };
      break;
    case '-':
      result = {
        x: minus(current.y, current.x),
        y: current.z,
        z: current.t,
        t: '0',
      };
      break;
    case '+':
      result = {
        x: plus(current.y, current.x),
        y: current.z,
        z: current.t,
        t: '0',
      };
      break;
    case 'clear':
      result = { x: '0', y: '0', z: '0', t: '0' };
      break;
    default:
      if (input === '.' && current.x.includes('.')) {
        return result;
      }
      if (current.x === '0') {
        result = { ...current, x: input };
      } else {
        result = { ...current, x: current.x + input };
      }
      break;
  }

  return result;
};
