import { config } from '@/config'

const userPreferredLocaleStorageKey = 'user-lcid'

export const getDefaultLocale = () => {
  // get a reference from the available locales array from our config
  const availableLocales = config.localization.locales
  // return the one marked isDefault
  return availableLocales.find((o) => o.isDefault) as {
    key: string
    isDefault: boolean
  }
}

export const getUserPreferredLocale = () => {
  const preferredLocale = localStorage.getItem(userPreferredLocaleStorageKey)
  if (!preferredLocale) {
    // if not, use the default locale from config
    const defaultLocale = getDefaultLocale().key
    return defaultLocale
  }
  return preferredLocale
}

export const setUserPreferredLocale = (locale: string) => {
  localStorage.setItem(userPreferredLocaleStorageKey, locale)
}
