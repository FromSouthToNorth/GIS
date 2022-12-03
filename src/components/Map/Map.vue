<template>
  <div id="map-container"></div>
  <map-bar :scale="scale" :lat-lng="latLng" />
</template>

<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import leafletMapStore from '/@/store/moduels/leafletMap.js'
import {scaleUpdateMetric} from "/@/utils/mapUtil.js";
import MapBar from "/@/components/Map/MapBar.vue";
import {toFixed} from "/@/utils/util.js";

const mapStore = leafletMapStore()

const lMap = ref(null);
const baseLayer = ref(Map);
const scale = ref('');
const latLng = ref({});

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

  const latlng = {
    lat: 31.3227,
    lng: 108.5525
  }

  lMap.value = L.map('map-container', {
    center: [latlng.lat, latlng.lng], // 北纬34°32′27.00″，东经108°55′25.00″
    zoom: 6,
    minZoom: 4,
    maxZoom: 18,
    attributionControl: false,
    zoomControl: false,
    layers: [baseLayer.value],
  });

  latLng.value = latlng;

  // 初始化地图比例尺
  scale.value = scaleUpdateMetric(lMap.value);

  // 监听地图缩放层级变化 [获取比例规格]
  lMap.value.on('zoom', e => {
    scale.value = scaleUpdateMetric(lMap.value);
  });

  // 监听地图🖱️鼠标移动事件 [获取鼠标所在地图的经纬度]
  lMap.value.on('mousemove', e => {
    let {lat, lng} = e.latlng
    lat = toFixed(lat, 7);
    lng = toFixed(lng, 7);
    latLng.value = {lat, lng};
  });

  mapStore.setMap(lMap.value);
}
</script>

<style scoped>

</style>
