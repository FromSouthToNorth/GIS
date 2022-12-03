/** 会用的一些工具 */

/**
 * 保留 N 位小数
 * @param n 输入的小数
 * @param fixed 保留的位数
 * @returns {number}
 */
export function toFixed(n, fixed) {
  return ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
}
