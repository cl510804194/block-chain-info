import numbro from 'numbro';
import BigNumber from 'bignumber.js';

export function formatTokenAmount(amount: number, decimals: number): string {
  return numbro(amount / Math.pow(10, decimals)).format({
    thousandSeparated: true,
    mantissa: decimals,
    trimMantissa: true,
  });
}

/**
 * 9999999.99999999999  -->  9,999,999.99
 * @param amount
 * @param mantissa
 * @returns
 */
export const formatAmount = (amount: number | string, mantissa = 4): string => {
  return new BigNumber(amount).toFormat(mantissa, 1).replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
};

// from token's address and decimals
export const toTokenDecimals = (value: string | number, decimals: number = 8) => {
  return new BigNumber(value).times(new BigNumber(10).pow(decimals));
};

// to token's address and decimals
export const fromTokenDecimals = (value: string | number, decimals: number = 8) => {
  return new BigNumber(value).div(new BigNumber(10).pow(decimals));
};
