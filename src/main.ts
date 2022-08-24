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

export class RPN {
  private s: Stack;
  private e: boolean;
  private o: boolean;

  constructor(s: Stack) {
    this.s = { ...s };
    this.e = false;
    this.o = false;
  }

  instance(): RPN {
    return this;
  }

  result(): Stack {
    return this.s;
  }

  enter(): RPN {
    const cur = { ...this.s };
    this.s = { x: cur.x, y: cur.x, z: cur.y, t: cur.z };
    this.e = true;
    this.o = false;

    return this;
  }

  abs(): RPN {
    const cur = { ...this.s };
    if (cur.x.length < 1) return this;
    this.s = { ...cur, x: abs(cur.x) };

    return this;
  }

  swap(): RPN {
    const cur = { ...this.s };
    if (cur.x.length < 1 || cur.y.length < 1) return this;
    this.s = { ...cur, x: cur.y, y: cur.x };
    this.e = false;
    this.o = true;

    return this;
  }

  backspace(): RPN {
    const cur = { ...this.s };
    this.s = { ...cur, x: cur.x.length === 1 ? '0' : cur.x.slice(0, -1) };
    this.e = false;
    this.o = false;

    return this;
  }

  div(): RPN {
    const cur = { ...this.s };
    if (cur.x.length < 1 || cur.y.length < 1) return this;
    this.s = { x: div(cur.y, cur.x), y: cur.z, z: cur.t, t: cur.t };
    this.o = true;

    return this;
  }

  times(): RPN {
    const cur = { ...this.s };
    if (cur.x.length < 1 || cur.y.length < 1) return this;
    this.s = { x: times(cur.y, cur.x), y: cur.z, z: cur.t, t: cur.t };
    this.o = true;

    return this;
  }

  minus(): RPN {
    const cur = { ...this.s };
    if (cur.x.length < 1 || cur.y.length < 1) return this;
    this.s = { x: minus(cur.y, cur.x), y: cur.z, z: cur.t, t: cur.t };
    this.o = true;

    return this;
  }

  plus(): RPN {
    const cur = { ...this.s };
    if (cur.x.length < 1 || cur.y.length < 1) return this;
    this.s = { x: plus(cur.y, cur.x), y: cur.z, z: cur.t, t: cur.t };
    this.o = true;

    return this;
  }

  clear(): RPN {
    this.s = { x: '0', y: '0', z: '0', t: '0' };
    this.e = false;
    this.o = false;

    return this;
  }

  period(): RPN {
    const cur = { ...this.s };
    if (cur.x.length < 1) return this;
    if (cur.x.includes('.')) return this;
    if (this.o) {
      this.enter();
    }
    this.s = { ...cur, x: cur.x + '.' };
    this.e = false;
    this.o = false;

    return this;
  }

  n(a: string): RPN {
    if (a.length < 1) return this;
    if (this.o) {
      this.enter();
    }
    const cur = { ...this.s };
    if (cur.x === '0' || this.e) {
      this.s = { ...cur, x: a };
      this.e = false;
    } else {
      this.s = { ...cur, x: cur.x + a };
    }
    this.e = false;
    this.o = false;

    return this;
  }
}
