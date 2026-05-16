import { ref } from 'vue'
import { about } from './about'
import { common } from './common'
import { filteredSchedule } from './filteredSchedule'
import { finalResults } from './finalResults'
import { footer } from './footer'
import { gallery } from './gallery'
import { home } from './home'
import { instagramFeed } from './instagramFeed'
import { language } from './language'
import { matches } from './matches'
import { nav } from './nav'
import { pastEditions } from './pastEditions'
import { registrationInfo } from './registrationInfo'
import { registrationsBoard } from './registrationsBoard'
import { rules } from './rules'
import { scheduleResults } from './scheduleResults'
import { sponsors } from './sponsors'

export type Language = 'pt' | 'en' | 'es'

export const translations = {
  about,
  common,
  filteredSchedule,
  finalResults,
  footer,
  gallery,
  home,
  instagramFeed,
  language,
  matches,
  nav,
  pastEditions,
  registrationInfo,
  registrationsBoard,
  rules,
  scheduleResults,
  sponsors,
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
    const value = getNestedValue(translations, key)

    if (!value || typeof value !== 'object') {
      return key
    }

    const translatedValue = (value as Partial<Record<Language, unknown>>)[currentLanguage.value]

    if (typeof translatedValue !== 'string') {
      return key
    }

    return interpolate(translatedValue, params)
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
