declare type Stack = {
    t: string;
    z: string;
    y: string;
    x: string;
};
declare type Operator = 'enter' | 'abs' | 'swap' | 'backspace' | '7' | '8' | '9' | '/' | '4' | '5' | '6' | '*' | '1' | '2' | '3' | '-' | 'clear' | '0' | '.' | '+';
export declare const rpnCalc: (input: Operator, current: Stack) => Stack;
export {};
//# sourceMappingURL=main.d.ts.map