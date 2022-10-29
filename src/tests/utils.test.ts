import { describe, expect, test } from '@jest/globals';
import { accumulate, formatAddress, getDateTime, getLeftTime } from '../utils/index';
import { formatTokenAmount, formatAmount, toTokenDecimals, fromTokenDecimals } from '../utils/number';
import px2vw from '../utils/px2vw';

const mockAccArray = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {},
];

const address = '0000000000000000000ef9c073beedafb33a4f1874b80ac16500516e782f5b85';

describe('Index', () => {
  test('accumulate', () => {
    expect(accumulate(mockAccArray, 'value')).toBe(10);
  });
  test('formatAddress', () => {
    expect(formatAddress(address)).toBe('00000-f5b85');
    expect(formatAddress()).toBe('');
  });
  test('getLeftTime', () => {
    expect(getLeftTime(1667027289231, 1667027289230)).toBe(1);
  });
  test('getDateTime', () => {
    expect(getDateTime(1000)).toEqual({
      d: 0,
      h: 0,
      m: 16,
      s: 40,
    });
  });
});

describe('number', () => {
  test('formatTokenAmount', () => {
    expect(formatTokenAmount(32516571, 8)).toBe('0.32516571');
  });
  test('formatAmount', () => {
    expect(formatAmount(1111)).toBe('1,111');
  });
  test('toTokenDecimals', () => {
    expect(toTokenDecimals(1).toString()).toBe((10 ** 8).toString());
    expect(toTokenDecimals(1, 5).toString()).toBe((10 ** 5).toString());
  });
  test('fromTokenDecimals', () => {
    expect(fromTokenDecimals(10 ** 8).toNumber()).toBe(1);
    expect(fromTokenDecimals(10 ** 5, 5).toNumber()).toBe(1);
  });
});

describe('px2vw', () => {
  test('px2vw', () => {
    expect(px2vw(100)).toBe('26.666666666666668vw');
    expect(px2vw(0)).toBe('0vw');
    expect(px2vw(400)).toBe('100vw');
    expect(px2vw(400, 375, true)).toBe('106.66666666666667vw');
    expect(px2vw(375, 375, true, true)).toBe('100');
    expect(px2vw(-400)).toBe('-100vw');
  });
});
