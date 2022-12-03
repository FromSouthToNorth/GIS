<template>
  <div class="map-bar">
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
import {computed, defineComponent} from "vue";
import {LoadingOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
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
    const scale = computed(() => {
      return props.scale ? props.scale : ''
    })
    const latLng = computed(() => {
      return props.latLng ? props.latLng : null
    })
  }
})


</script>

<style scoped>

</style>
