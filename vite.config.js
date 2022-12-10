import {defineConfig, loadEnv} from 'vite'
import {resolve} from 'path'
import createVitePlugins from "./vite/plugins/index.js";

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig(({mode, command}) => {
  const env = loadEnv(mode, process.cwd());
  const {VITE_APP_ENV} = env;
  return {
    plugins: createVitePlugins(env, command === 'build'),

    base: VITE_APP_ENV === 'production' ? '/' : '/',

    server: {
      port: 80,
      host: true,
      open: true,
    },

    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        }
      ]
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
  }
})
