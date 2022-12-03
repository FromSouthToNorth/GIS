<template>
  <div id="map-container"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import leafletMapStore from '/@/store/moduels/leafletMap'

const mapStore = leafletMapStore()
const lMap = ref(null);
const baseLayer = ref(Map);

onMounted(() => {
  initMap();
})

/** 初始化 leaflet map */
function initMap() {
  baseLayer.value = L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}{r}?access_token={token}', {
    username: 'mapbox',
    style_id: 'satellite-v9',
    token: 'pk.eyJ1IjoiaHlzZSIsImEiOiJja3c0ZDNxdTIwNHk1MnBtem5yZ2s4MDJmIn0.Bc8fEfsCPoB_ihTfnQ6zbg',
  });

  lMap.value = L.map('map-container', {
    center: [31.3227, 108.5525], // 北纬34°32′27.00″，东经108°55′25.00″
    zoom: 6,
    minZoom: 4,
    maxZoom: 18,
    attributionControl: false,
    zoomControl: false,
    layers: [baseLayer.value],
  });

  lMap.value.on('click', e => {
    console.log(e);
  })

  mapStore.setMap(lMap.value);
}
</script>

<style scoped>

</style>
