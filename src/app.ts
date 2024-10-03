import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// PrimeVue-UI组件库方案 ======================================== =>
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ru from './plugins/i18n-library/ru.json'
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

export default app
