import { BigNumber } from 'bignumber.js';

export const plus = (a: string, b: string): string =>
  BigNumber(a).plus(b).toString();

export const minus = (a: string, b: string): string =>
  BigNumber(a).minus(b).toString();

export const times = (a: string, b: string): string =>
  BigNumber(a).times(b).toString();

export const div = (a: string, b: string): string =>
  BigNumber(a).div(b).toString();

export const abs = (a: string): string => BigNumber(a).negated().toString();
