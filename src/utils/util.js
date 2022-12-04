/** 会用到的一些工具 */

/**
 * 保留 N 位小数
 * @param n 输入的小数
 * @param fixed 保留的位数
 * @returns {number}
 */
export function toFixed(n, fixed) {
  return ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
}


/**
 * 三位分割数字
 * @param num
 */
export function segmentationNumber(num) {
  const newNums = [], strNums = ('' + num).split('').reverse();
  let index = 0;
  for (const c of strNums) {
    if (++index > 3) {
      newNums.push(',');
      index = 0;
    }
    newNums.push(c);
  }
  return newNums.reverse().join('');
}
