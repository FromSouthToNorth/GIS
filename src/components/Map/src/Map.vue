<template>
  <div id="map-container" ref="mapRef"></div>
  <map-bar :lat="lat" :lng="lng" :scale="scale" @measurement="measurement"/>
  <drawer-form :type="drawerType" :visible="visible" @on-close="onClose" />
</template>

<script setup>
import {onMounted, ref, reactive, onBeforeUnmount, unref, onDeactivated} from "vue";
import leafletMapStore from '/@/store/moduels/leafletMap.js'
import {scaleUpdateMetric} from "/@/utils/mapUtil.js";
import MapBar from "/@/components/Map/src/MapBar.vue";
import {toFixed} from "/@/utils/util.js";
import sichun from "/@/json/state-province/sichun.json";
import chongqing from "/@/json/state-province/chongqing.json";
import china from "/@/json/china.json";
import DrawerForm from "/@/components/Map/src/DrawerForm.vue";
import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated.js";

const mapStore = leafletMapStore()

const mapRef = ref(null);

const visible = ref(false);
const drawerType = ref('');
let lMap = reactive({});
const baseLayer = reactive({});
const scale = ref('');
const lat = ref(31.3227);
const lng = ref(108.5525);
let markerClusterGroup = reactive({});
const drawLayerGroup = ref([])

/** 初始化 leaflet map */
function initMap() {
  const mapEl = unref(mapRef);
  if (!mapEl) return;

  baseLayer.value = L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}{r}?access_token={token}', {
    username: 'mapbox',
    style_id: 'streets-v12',
    token: 'pk.eyJ1IjoiaHlzZSIsImEiOiJja3c0ZDNxdTIwNHk1MnBtem5yZ2s4MDJmIn0.Bc8fEfsCPoB_ihTfnQ6zbg',
  });

  const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  });

  const gode = L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: "1234"
  })

  const baseMaps = {
    "OpenStreetMap": osm,
    "Mapbox Streets": baseLayer.value,
    "gaoDe": gode
  }

  const insMap = L.map(mapEl, {
    center: [lat.value, lng.value], // 北纬34°32′27.00″，东经108°55′25.00″
    zoom: 6,
    minZoom: 4,
    maxZoom: 18,
    zoomAnimation: true,
    rotate: true,
    attributionControl: false,
    zoomControl: false,
    layers: [baseLayer.value],
  });

  const layerControl = L.control.layers(baseMaps).addTo(insMap);

  insMap.pm.setLang('zh');

  // 初始化地图比例尺
  scale.value = scaleUpdateMetric(insMap);

  // 监听地图缩放层级变化 [获取比例规格]
  insMap.on('zoom', e => {
    scale.value = scaleUpdateMetric(insMap);
  });

  // 监听地图🖱️鼠标移动事件 [获取鼠标所在地图的经纬度]
  insMap.on('mousemove', e => {
    // let {lat, lng} =
    lat.value = toFixed(e.latlng.lat, 7);
    lng.value = toFixed(e.latlng.lng, 7);
  });

  insMap.on('pm:create', e => {
    console.log(e);
    const {shape, layer} = e;
    console.log(shape, layer);
    drawLayerGroup.value.push(layer);
    layer.bindContextMenu({
      contextmenu: true,
      contextmenuItems: [
        {
          text: "编辑",
        },
        {
          text: "删除",
        }
      ]
    })
    console.log(drawLayerGroup.value);
    drawerType.value = shape;
    visible.value = true;
    insMap.pm.disableDraw();
  });

  insMap.pm.addControls({
    positions: 'topleft'
  })

  // const layers = []
  // for (const val of china.features) {
  //   const {properties} = val;
  //   const {name, center} = properties;
  //   const mark = L.marker(L.latLng(center[1], center[0]), {
  //     icon: L.divIcon({
  //       className: 'div-icon',
  //       iconSize: [86, 18],
  //       html: `<div class="div-icon-text2">${name}</div>`
  //     })
  //   });
  //   layers.push(mark);
  // }
  // const chinaJson = L.geoJSON(china, {
  //   style: {
  //     color: '#f5222d',
  //     weight: 0.6,
  //     fill: false,
  //   }
  // })
  // layers.push(chinaJson);
  // const initLayers = L.layerGroup(layers, {}).addTo(lMap);
  // console.log(initLayers.hasLayer(chinaJson));
  // console.log(lMap.hasLayer(chinaJson));
  //
  // lMap.on('contextmenu', e => {
  //   const {latlng, containerPoint, } = e;
  //   console.log(e, latlng, containerPoint);
  //   const layerPointRelation = L.GeometryUtil.closestLayer(lMap, layers, latlng);
  //   const {distance, layer} = layerPointRelation
  //   console.log(layerPointRelation)
  //   console.log("最近的图层距离: ", distance, layer);
  // })
  //
  // markerClusterGroup = L.markerClusterGroup();
  // const markerClusterGroups = []
  // for (const val of sichun.features) {
  //   const {properties} = val;
  //   const {name, center} = properties;
  //   const marker = L.marker(L.latLng(center[1], center[0]), {
  //     name: name,
  //     icon: L.divIcon({
  //       className: 'div-icon',
  //       iconSize: [68, 16],
  //       html: `<div class="div-icon-text3">${name}</div>`
  //     })
  //   }).bindPopup(name);
  //   marker.on('click', e => {
  //     const {target} = e;
  //     console.log(e);
  //     console.log(target);
  //   })
  //   markerClusterGroups.push(marker)
  // }
  // for (const val of chongqing.features) {
  //   const {properties} = val;
  //   const {name, center} = properties;
  //   const marker = L.marker(L.latLng(center[1], center[0]), {
  //     name: name,
  //     icon: L.divIcon({
  //       className: 'div-icon',
  //       iconSize: [68, 16],
  //       html: `<div class="div-icon-text3">${name}</div>`
  //     })
  //   });
  //   marker.on('click', e => {
  //     const {target} = e;
  //     console.log(e);
  //     console.log(target);
  //   })
  //   markerClusterGroups.push(marker)
  // }
  // markerClusterGroup.addLayers(markerClusterGroups)
  // lMap.addLayer(markerClusterGroup);

  console.log("leaflet map 加载完成: ", insMap)
  mapStore.setMap(insMap);
  lMap = insMap;
}

function measurement() {
  lMap.pm.setGlobalOptions({});
  lMap.pm.enableDraw('Line', {
    snappable: true,
    snapDistance: 20,
  });
}
function onClose() {
  visible.value = false;
}

function destroy() {
  const mapInstance = unref(mapRef);
  if(!mapInstance) return;
  try {
    mapInstance.destroy();
  }
  catch (error) {}
  lMap = null;
}

onMountedOrActivated(initMap);

onBeforeUnmount(destroy);
onDeactivated(destroy);
</script>

<style scoped>

</style>
