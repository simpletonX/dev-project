/* eslint-disable */
// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
const app = createApp(App)

// i18n-国际化方案 ======================================== =>
import ru from './locales/primevue/ru.json'
import i18n from './modules/i18n'
app.use(i18n)

// fontawesome-svg图标库 ======================================== =>
import fontawesome from './modules/fontawesome'
app.use(fontawesome)

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
// PrimeVue-Service
import ToastService from 'primevue/toastservice'
app.use(ToastService)

app.mount('#app')
export default app
