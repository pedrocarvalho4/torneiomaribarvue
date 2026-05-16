import { ref } from 'vue'
import { pt } from './pt'
import { en } from './en'
import { es } from './es'

export type Language = 'pt' | 'en' | 'es'

export const translations = {
  pt,
  en,
  es,
}

const currentLanguage = ref<Language>('pt')

function getNestedValue(obj: unknown, path: string) {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }

    return undefined
  }, obj)
}

function interpolate(text: string, params?: Record<string, string | number>) {
  if (!params) {
    return text
  }

  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value))
  }, text)
}

export function useI18n() {
  function t(key: string, params?: Record<string, string | number>) {
    const value = getNestedValue(translations[currentLanguage.value], key)

    if (typeof value !== 'string') {
      return key
    }

    return interpolate(value, params)
  }

  function setLanguage(language: Language) {
    currentLanguage.value = language
  }

  return {
    t,
    currentLanguage,
    setLanguage,
  }
}
