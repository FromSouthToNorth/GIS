/** 会用到的一些工具 */

/**
 * 保留 N 位小数
 * @param num 输入的小数
 * @param fixed 保留的位数
 * @returns {number}
 */
export function toFixed(num, fixed) {
  if (!fixed) {
    fixed = 7;
  }
  const res = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed) + '})?');
  return parseFloat(num.toString().match(res)[0]);
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

export const withInstall = (component, alias) => {
  const comp = component;
  comp.install = (app) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component;
}
