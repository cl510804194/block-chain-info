export const formatAddress = (address?: string, length: number = 5) => {
  if (!address) return '';
  return address.slice(0, length) + '-' + address.slice(address.length - length, address.length);
};

export const accumulate = <T>(arr: T[], itemKey: string) => {
  return arr.reduce((pre, item) => {
    return pre + (item?.[`${itemKey}`] || 0);
  }, 0);
};

/**
 * get left time from start time
 *
 * @param {(string | number)} endTime //expire at
 * @param {string} [startTime]
 */

export const getLeftTime = (endTime: string | number, startTime: number) => {
  const leftTime = Number(endTime) - startTime;
  return leftTime;
};

/**
 * get days,hours,minutes,seconds,from timestamp
 *
 * @param {number} seconds
 * @return {*}
 */
export const getDateTime = (seconds: number) => {
  const d = Math.floor(seconds / 3600 / 24);
  const h = Math.floor((seconds / 3600) % 24);
  const m = Math.floor((seconds / 60) % 60);
  const s = Math.floor(seconds % 60);
  return {
    d,
    h,
    m,
    s,
  };
};
