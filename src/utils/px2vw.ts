/**
 * use this function to result with h5
 *
 * @param {number} px
 * @param {number} [unit=375]
 * @param {boolean} [ignoreMax=false]
 * @param {boolean} [ignoreUnit=false]
 * @return {*}  {string}
 */
export default function px2vw(px: number, unit = 375, ignoreMax = false, ignoreUnit = false): string {
  if (!ignoreMax) {
    if (px > unit) {
      return '100vw';
    } else if (px < -1 * unit) {
      return '-100vw';
    }
  }

  // 100vw = ${unit}px
  return `${(px / unit) * 100}${ignoreUnit ? '' : 'vw'}`;
}
