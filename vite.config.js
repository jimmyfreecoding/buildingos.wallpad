import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base:'/wallpad',
  server: {
    hmr: {
      overlay: true,
    },
    host: '0.0.0.0',
    port:'5175',
    warmup: {
      clientFiles: ['./index.html', './library/{components,layouts}/*', './src/{views,plugins}/*'],
    },
    fs: {
      cachedChecks: true,
    },
    proxy: {
      '/setCleanTime': {
        target: 'http://10.205.66.7:1880/',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router','@vueuse/core'],
      //存放的位置
      dts: 'src/types/auto-import.js',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
