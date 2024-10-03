import { ref, watch } from 'vue'
import { usePrimeVue } from 'primevue/config'
import { createI18n } from 'vue-i18n'

// 动态导入所有语言包 JSON 文件
const localeFiles = import.meta.glob('./i18n-library/!(*presets).json', {
  eager: true,
})
const presets = await import('./i18n-library/presets.json')

// 遍历本地语言包，输出到messages
const messages: Record<string, Record<string, string>> = Object.entries(localeFiles).reduce(
  (messages, [path, module]) => {
    const match = path.match(/\.\/i18n-library\/(.+)\.json/)
    if (match) {
      const locale = match[1]
      messages[locale] = {
        ...(module as Record<string, string>),
        ...(presets.default[locale as keyof typeof presets.default] || {}),
      }
    }
    return messages
  },
  {} as Record<string, Record<string, string>>
)

const i18n = createI18n({
  legacy: false,
  locale: 'ru', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages,
})

export function useLanguage() {
  const primevue = usePrimeVue()
  const currentLocale = ref(i18n.global.locale.value)
  const availableLocales = ref(Object.keys(presets.default))

  const changeLocale = async (locale: string) => {
    // 更新 Vue I18n 的语言
    i18n.global.locale.value = locale

    // 更新 PrimeVue 的语言
    const primeLocale = await import(`./i18n-library/${locale}.json`)
    primevue.config.locale = primeLocale.default

    // 保存到 localStorage
    localStorage.setItem('currentLocale', locale)
    currentLocale.value = locale
  }

  // 监听语言环境变化
  watch(currentLocale, (newLocale) => {
    changeLocale(newLocale)
  })

  // 初始化语言
  const initLocale = localStorage.getItem('currentLocale') || navigator.language
  if (Object.keys(messages).includes(initLocale)) {
    changeLocale(initLocale)
  } else {
    changeLocale('ru')
  }

  return {
    currentLocale,
    changeLocale,
    t: i18n.global.t,
    availableLocales,
  }
}

export default i18n
