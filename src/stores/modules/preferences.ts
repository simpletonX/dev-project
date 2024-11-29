import { getLocalStorage, setLocalStorage } from '@/utils/localStorge'
import { defineStore } from 'pinia'

interface Preferences {
  asideBarExpanded: boolean
}

export const usePreferenceStore = defineStore('preferences', () => {
  const preferencesJson: string | null | Preferences = getLocalStorage('preferences')
  const defaultPreferences: Preferences = {
    asideBarExpanded: false,
  }
  const preferences = ref<Preferences>(preferencesJson ? JSON.parse(preferencesJson) : defaultPreferences)

  function setPreferences(key: keyof Preferences, value: any) {
    preferences.value[key] = value
    setLocalStorage('preferences', JSON.stringify(preferences.value))
  }

  return {
    preferences,
    setPreferences,
  }
})
