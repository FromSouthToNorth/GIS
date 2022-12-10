import * as icons from '@ant-design/icons-vue';

export default {
  install: (app) => {
    for (const icon in icons) {
      const componentConfig = icons[icon];
      app.component(icon, componentConfig);
    }
  }
}
