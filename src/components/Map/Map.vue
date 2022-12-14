<template>
  <div id="map-container"></div>
  <map-bar :scale="scale" :lat-lng="latLng"/>
</template>

<script setup>
import {onMounted, ref, reactive} from "vue";
import leafletMapStore from '/@/store/moduels/leafletMap.js'
import {scaleUpdateMetric} from "/@/utils/mapUtil.js";
import MapBar from "/@/components/Map/MapBar.vue";
import {toFixed} from "/@/utils/util.js";
import sichun from "/@/json/state-province/sichun.json";
import chongqing from "/@/json/state-province/chongqing.json";
import china from "/@/json/china.json";

const mapStore = leafletMapStore()

let lMap = reactive({});
const baseLayer = reactive({});
const scale = ref('');
const latLng = reactive({});
let markerClusterGroup = reactive({});

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

  latLng.value = latlng;

  lMap = L.map('map-container', {
    center: [latlng.lat, latlng.lng], // 北纬34°32′27.00″，东经108°55′25.00″
    zoom: 6,
    minZoom: 4,
    maxZoom: 18,
    zoomAnimation: true,
    rotate: true,
    attributionControl: false,
    zoomControl: false,
    layers: [baseLayer.value],
  });

  // 初始化地图比例尺
  scale.value = scaleUpdateMetric(lMap);

  // 监听地图缩放层级变化 [获取比例规格]
  lMap.on('zoom', e => {
    scale.value = scaleUpdateMetric(lMap);
  });

  // 监听地图🖱️鼠标移动事件 [获取鼠标所在地图的经纬度]
  lMap.on('mousemove', e => {
    let {lat, lng} = e.latlng
    lat = toFixed(lat, 7);
    lng = toFixed(lng, 7);
    latLng.value = {lat, lng};
  });

  const layers = []
  for (const val of china.features) {
    const {properties} = val;
    const {name, center} = properties;
    const mark = L.marker(L.latLng(center[1], center[0]), {
      icon: L.divIcon({
        className: 'div-icon',
        iconSize: [86, 18],
        html: `<div class="div-icon-text2">${name}</div>`
      })
    });
    layers.push(mark);
  }
  const chinaJson = L.geoJSON(china, {
    style: {
      color: '#fff',
      weight: 0.8,
      fill: false,
    }
  })
  layers.push(chinaJson);
  const initLayers = L.layerGroup(layers, {}).addTo(lMap);
  console.log(initLayers.hasLayer(chinaJson));
  console.log(lMap.hasLayer(chinaJson));

  lMap.on('contextmenu', e => {
    const {latlng, containerPoint, } = e;
    console.log(e, latlng, containerPoint);
    const layerPointRelation = L.GeometryUtil.closestLayer(lMap, layers, latlng);
    const {distance, layer} = layerPointRelation
    console.log(layerPointRelation)
    console.log("最近的图层距离: ", distance, layer);
  })

  markerClusterGroup = L.markerClusterGroup();
  const markerClusterGroups = []
  for (const val of sichun.features) {
    const {properties} = val;
    const {name, center} = properties;
    const marker = L.marker(L.latLng(center[1], center[0]), {
      name: name,
      icon: L.divIcon({
        className: 'div-icon',
        iconSize: [68, 16],
        html: `<div class="div-icon-text3">${name}</div>`
      })
    }).bindPopup(name);
    marker.on('click', e => {
      const {target} = e;
      console.log(e);
      console.log(target);
    })
    markerClusterGroups.push(marker)
  }
  for (const val of chongqing.features) {
    const {properties} = val;
    const {name, center} = properties;
    const marker = L.marker(L.latLng(center[1], center[0]), {
      name: name,
      icon: L.divIcon({
        className: 'div-icon',
        iconSize: [68, 16],
        html: `<div class="div-icon-text3">${name}</div>`
      })
    });
    marker.on('click', e => {
      const {target} = e;
      console.log(e);
      console.log(target);
    })
    markerClusterGroups.push(marker)
  }
  markerClusterGroup.addLayers(markerClusterGroups)
  lMap.addLayer(markerClusterGroup);

  console.log("leaflet map 加载完成: ", lMap)

  mapStore.setMap(lMap.value);
}
</script>

<style scoped>

</style>
