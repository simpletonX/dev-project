import { createI18n } from 'vue-i18n'
import { usePrimeVue } from 'primevue/config'

import presets from '@/locales/presets.json'
const i18n = createI18n({
  legacy: false,
  locale: 'ru', // 默认语言
  fallbackLocale: 'us', // 回退语言
  messages: presets,
})

export function useLanguage() {
  const primevue = usePrimeVue()
  const currentLocale = ref(i18n.global.locale.value)
  // 可选语言列表
  const availableLocales = [
    { label: 'Русский', code: 'ru' },
    { label: 'English', code: 'us' },
    { label: 'Deutsch', code: 'de' },
    { label: '中文简体', code: 'cn' },
  ]

  const changeLocale = async (locale: string, callback?: () => void) => {
    // 更新 Vue I18n 的语言
    i18n.global.locale.value = locale as 'ru' | 'us' | 'de' | 'cn'
    // 保存到 localStorage
    localStorage.setItem('currentLocale', locale)
    currentLocale.value = locale as 'ru' | 'us' | 'de' | 'cn'
    callback && callback()
  }

  // 监听语言环境变化
  watch(currentLocale, (newLocale) => changeLocale(newLocale))

  // 初始化语言
  const initLocale = localStorage.getItem('currentLocale') || navigator.language
  if (availableLocales.map((el) => el.code).includes(initLocale)) {
    changeLocale(initLocale)
  } else {
    changeLocale('ru')
  }
  // 更新 PrimeVue 的语言
  ;(async () => {
    primevue.config.locale = await import(`@/locales/primevue/${i18n.global.locale.value}.json`)
  })()

  return {
    currentLocale,
    changeLocale,
    t: i18n.global.t,
    availableLocales,
  }
}

export default i18n
