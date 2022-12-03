import { createApp } from 'vue'
import App from './App.vue'

import 'leaflet'
import 'leaflet/dist/leaflet.css'

import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/less/index.less'
import router from "/@/router/index.js";
import store from "/@/store/index.js";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Ant);

app.mount('#app');
