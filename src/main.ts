/* eslint-disable */
// @ts-nocheck
import app from './app'
import './styles/index.scss'

// i18n-国际化方案 ======================================== =>
import ru from './plugins/i18n-library/ru.json'
import i18n from './plugins/i18n'
app.use(i18n)

// fontawesome-svg图标库 ======================================== =>
import fontawesome from './plugins/fontawesome'
app.use(fontawesome)

app.mount('#app')
