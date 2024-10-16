// import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { viteMockServe } from 'vite-plugin-mock'
import { UserConfigExport, ConfigEnv } from 'vite'
// import VueRouter from 'unplugin-vue-router/vite'
import path from 'path'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      // 动态路由-自动生成路由 (必须在vue()之前调用)
      // VueRouter({}),
      // 自动导入模块
      AutoImport({
        imports: ['vue', 'vue-router'],
        // 生成 TypeScript 声明文件
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      vue(),
      // 自动导入组件（按需导入）
      Components({
        resolvers: [PrimeVueResolver()],
      }),
      // vite-mockjs-模拟接口
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
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
