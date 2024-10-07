import { SelectButtonChangeEvent } from 'primevue/selectbutton'

export function useTheme() {
  const currentTheme = ref(false)
  // 可选预设主题
  const themeOptions = [
    {
      label: 'Light',
      value: false,
    },
    {
      label: 'Dark',
      value: true,
    },
  ]

  // 切换当前主题
  function toggleTheme(isDark: SelectButtonChangeEvent) {
    currentTheme.value = isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // 初始化主题（跟随系统/监听系统主题变化）
  function initTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDark) {
      currentTheme.value = true
      document.documentElement.classList.add('dark')
    } else {
      currentTheme.value = false
      document.documentElement.classList.remove('dark')
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const newIsDark = e.matches
      if (newIsDark !== currentTheme.value) {
        toggleTheme({ value: newIsDark, originalEvent: e })
      }
    })
  }

  onMounted(() => initTheme())

  return {
    toggleTheme,
    themeOptions,
    currentTheme,
  }
}
