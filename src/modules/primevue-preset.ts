import ru from '@/locales/primevue/ru.json'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      dark: {
        surface: {
          50: '{primary.50}',
          100: '{primary.100}',
          200: '{primary.200}',
          300: '{primary.300}',
          400: '{primary.400}',
          500: '{primary.500}',
          600: '{primary.600}',
          700: '{primary.700}',
          800: '{primary.800}',
          900: '{primary.900}',
          950: '{primary.950}',
        },
      },
    },
    primary: {
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
      950: '{slate.950}',
    },
  },
})

export default {
  // 配置 PrimeVue 默认主题风格
  theme: {
    preset: MyPreset,
    options: {
      // CSS 变量的前缀 (var(--p-primary-color))
      prefix: 'p',
      // 封装黑暗模式 CSS 变量的 CSS 规则
      darkModeSelector: '.dark',
      cssLayer: false,
    },
  },
  locale: ru,
}
