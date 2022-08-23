export declare type Stack = {
    t: string;
    z: string;
    y: string;
    x: string;
};
export declare type Input = 'enter' | 'abs' | 'swap' | 'backspace' | '7' | '8' | '9' | '/' | '4' | '5' | '6' | '*' | '1' | '2' | '3' | '-' | 'clear' | '0' | '.' | '+';
export declare class RPN {
    private s;
    private e;
    private o;
    constructor(s: Stack);
    result(): Stack;
    enter(): RPN;
    abs(): RPN;
    swap(): RPN;
    backspace(): RPN;
    div(): RPN;
    times(): RPN;
    minus(): RPN;
    plus(): RPN;
    clear(): RPN;
    period(): RPN;
    n(a: string): RPN;
}
//# sourceMappingURL=main.d.ts.map