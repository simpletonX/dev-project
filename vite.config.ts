// import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { viteMockServe } from 'vite-plugin-mock'
import { UserConfigExport, ConfigEnv } from 'vite'

import path from 'path'
// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          // 自动导入 PrimeVue 组件（按需引入）
          PrimeVueResolver(),
        ],
      }),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 全局导入自定义scss变量
          additionalData: `@use "@/styles/variable.scss" as *;`,
        },
      },
    },
    server: {
      port: 5173,
    },
  }
}
