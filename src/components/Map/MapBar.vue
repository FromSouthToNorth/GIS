<template>
  <div class="map-bar">
    <div class="svg-item">
      <svg-icon :icon-class="'ruler'" :size="18 "/>
    </div>
    <div class="map-scale">
      <div class="scale-bar">
        <div class="scale-text">
          {{ scale }}
        </div>
      </div>
    </div>
    <div class="map-latlng">
      <span>{{ latLng.lat }}</span>
      <span>{{ latLng.lng }}</span>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, watch} from "vue";
import {LoadingOutlined} from "@ant-design/icons-vue";
import SvgIcon from "/@/components/SvgIcon/index.vue";

export default defineComponent({
  components: {
    SvgIcon,
    LoadingOutlined
  },
  props: {
    scale: {
      type: String
    },
    latLng: {
      type: Object,
      default: {
        lat: 0,
        lng: 0,
      }
    },
  },
  setup(props) {
  }
})


</script>

<style scoped>

</style>
