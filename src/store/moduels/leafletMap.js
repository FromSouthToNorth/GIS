import {defineStore} from "pinia";

const leafletMapStore = defineStore(
  "leafletMap",

  {
    state: () => ({
      lMap: null,
      markerClusterGroup: null,
    }),

    actions: {
      /** 设置 leaflet map */
      setMap(lMap) {
        this.lMap = lMap;
      },

      /** 获取 leaflet map */
      getMap() {
        return this.lMap;
      },

      /** 设置标记聚合的分组 */
      setMarkerClusterGroup(markerClusterGroup) {
        this.markerClusterGroup = markerClusterGroup;
      },

      /** 获取标记聚合的分组 */
      getMarkerClusterGroup() {
        return this.markerClusterGroup;
      }
    }
  }
)

export default leafletMapStore
