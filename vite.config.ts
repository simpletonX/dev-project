import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // 自动导入 PrimeVue 组件（按需引入）
        PrimeVueResolver(),
      ],
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
})
