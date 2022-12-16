<template>
  <div class="map-bar">
<!--    <div class="svg-item">-->
<!--      <svg-icon @click="$emit('measurement')" :icon-class="'ruler'" :size="18 "/>-->
<!--    </div>-->
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

<script setup>
import {reactive, watch} from "vue";
import SvgIcon from "/@/components/SvgIcon/index.vue";
import gsap from "gsap";

const props = defineProps({
  scale: {
    type: String
  },
  lat: {
    type: [Number, String]
  },
  lng: {
    type: [Number, String]
  }
})

const latLng = reactive({
  lat: 0,
  lng: 0
})

function AnimateToValue() {
  gsap.to(latLng, {
    duration: 0.6,
    lat: props.lat,
    lng: props.lng
  })
}

AnimateToValue();

watch(() => props.lat, () => AnimateToValue())
watch(() => props.lng, () => AnimateToValue())
</script>

<style scoped>

</style>
