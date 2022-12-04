import {segmentationNumber} from "./util";
/** 🌍 leaflet 当中的方法为了不破坏源码方便调用，抄写出来 */

/**
 * 获取更新地图的比例
 * @param map 地图
 */
export function scaleUpdateMetric(map) {
  const y = map.getSize().y / 2;
  const maxMeters = map.distance(
    map.containerPointToLatLng([0, y]),
    map.containerPointToLatLng([100, y]));

  const pow10 = Math.pow(10, (Math.floor(maxMeters) + '').length - 1);
  let d = maxMeters / pow10;

  d = d >= 10 ? 10:
    d >= 5 ? 5 :
      d >= 3 ? 3 :
        d >= 2 ? 2 : 1;

  return pow10 * d >= 10000 ? segmentationNumber(pow10 * d / 1000) + '公里' : segmentationNumber(pow10 * d) + '米';
}

