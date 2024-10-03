/* eslint-disable */
// @ts-nocheck
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)

// PrimeVue-UI组件库方案 ======================================== =>
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
app.use(PrimeVue, {
  // 配置 PrimeVue 默认主题风格
  theme: {
    preset: Aura,
    options: {
      // CSS 变量的前缀 (var(--p-primary-color))
      prefix: 'p',
      // 封装黑暗模式 CSS 变量的 CSS 规则
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
  locale: ru,
})

// i18n-国际化方案 ======================================== =>
import ru from './plugins/i18n-library/ru.json'
import i18n from './plugins/i18n'
app.use(i18n)

// fontawesome-svg图标库 ======================================== =>
import fontawesome from './plugins/fontawesome'
app.use(fontawesome)

app.mount('#app')
