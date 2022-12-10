import { createApp } from 'vue';
import App from './App.vue';

import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-contextmenu';
import 'leaflet-heatmap';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import 'leaflet-rotate';
import 'leaflet-geometryutil/src/leaflet.geometryutil'

import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/less/index.less';
import router from "/@/router/index.js";
import store from "/@/store/index.js";

import 'virtual:svg-icons-register';
import SvgIcon from "/@/components/SvgIcon/index.vue";
import antIcons from '/@/components/SvgIcon/svgicon'

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Ant);
app.component('svg-icon', SvgIcon);
app.use(antIcons);

app.mount('#app');
