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
  const strNum = num + '', n = strNum.length;
  if (n <= 3) {
    return num;
  }
  const newNums = [];
  let index = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (++index > 3) {
      newNums.push(',');
      index = 0;
    }
    newNums.push(strNum[i]);
  }
  return newNums.reverse().join('');
}
