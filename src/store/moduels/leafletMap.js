import {defineStore} from "pinia";

const leafletMapStore = defineStore(
  "leafletMap",

  {
    state: () => ({
      lMap: null,
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
    }
  }
)

export default leafletMapStore
