/* eslint-disable */
// @ts-nocheck
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ru from './plugins/i18n-library/ru.json'
import i18n from './plugins/i18n'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
  faUserSecret,
  faFontAwesome,
  faEarthAmericas,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret, faFontAwesome, faEarthAmericas, faAngleRight)

const app = createApp(App)
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
app.use(i18n)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
