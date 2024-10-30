import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
const app = createApp(App)

// v-loading-指令 ======================================== =>
import { loadingDirective } from '@/plugins/v-loading'
app.directive('loading', loadingDirective)

// i18n-国际化方案 ======================================== =>
import i18n from './utils/i18n'
app.use(i18n)

// fontawesome-svg图标库 ======================================== =>
import fontawesome from './utils/fontawesome'
app.use(fontawesome)

// PrimeVue-UI组件库方案 ======================================== =>
import PrimeVue from 'primevue/config'
import PrimeVuePreset from './utils/primevue-preset'
app.use(PrimeVue, PrimeVuePreset)
// primeicons-图标库
import 'primeicons/primeicons.css'

// PrimeVue-Service [toast] 弹出框组件Service
import ToastService from 'primevue/toastservice'
app.use(ToastService)

// flag-icons ======================================== =>
import 'flag-icons/css/flag-icons.min.css'

// 应用-router ======================================== =>
import router from './router'
app.use(router)

// 应用-pinia ======================================== =>
import pinia from './stores'
app.use(pinia)

// NProgress-进度条样式 ======================================== =>
import 'nprogress/nprogress.css'

// v-progress-指令 ======================================== =>
import { progressDirective } from '@/plugins/v-progress'
app.directive('progress', progressDirective)

app.mount('#app')
export default app
