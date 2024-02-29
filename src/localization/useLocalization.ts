import { config } from '@/config'
import { apiClient } from '../api-client'
import { ref, nextTick } from 'vue'

import { i18n } from './i18n.init'
import { getUserPreferredLocale, setUserPreferredLocale } from './utils'

// get a reference to the localStorageCache config
const localStorageConfig = config.localization.localStorageCache

// save the default localeId in a local variable:
const defaultLocaleId = getUserPreferredLocale()

// state
const isLoadingLocale = ref(true) // will set to true while a locale is being loaded
const currentLocale = ref(defaultLocaleId) // will be set to the current lcid value

// helper to change the current 18n locale
const changeLocale = async (lcid: string) => {
  // set our loading flag to true:
  isLoadingLocale.value = true

  // try to get it from local storage
  // dynamic key we use to cache the actual locale JSON data in the browser's local storage

  const localStorageKey = `lcid-data-${lcid}`

  const cacheEntryModel = {
    appVersion: -1,
    expiresAt: 0,
    json: '',
  }

  // retrieve the cache entry from local storage
  const cacheEntryStr = localStorage.getItem(localStorageKey) || JSON.stringify(cacheEntryModel)
  let cacheEntry = cacheEntryModel
  // if localStorage is enabled through config, then proceed trying to parse the cache entry
  if (localStorageConfig.enabled) {
    try {
      cacheEntry = JSON.parse(cacheEntryStr)
    } catch (error) {
      console.error('Error parsing cache entry', error)
    }
  }

  // if the cache entry is valid and not expired, then use it
  if (
    cacheEntry &&
    cacheEntry.appVersion == config.global.version &&
    cacheEntry.expiresAt - Date.now() > 0
  ) {
    // switch locale by invoking setLocaleMessage
    i18n.global.setLocaleMessage(lcid, cacheEntry.json)
    // switch locale using i18n
    i18n.global.locale = lcid
    // update the current locale
    currentLocale.value = lcid
  } else {
    console.log('Fetching locale data from the server: lcid:', lcid)
    const localeData = await apiClient.localization.fetchTranslation('translation', lcid)
    i18n.global.setLocaleMessage(lcid, localeData)
    i18n.global.locale = lcid
    currentLocale.value = lcid

    const dt = new Date()
    if (localStorageConfig.enabled) {
      const expiresAt = dt.setMinutes(dt.getMinutes() + localStorageConfig.expirationInMinutes)
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          appVersion: config.global.version,
          expiresAt,
          json: localeData,
        }),
      )
    }
  }
  setUserPreferredLocale(lcid)

  // set our loading flag to false:
  isLoadingLocale.value = false

  nextTick()
}

export function useLocalization() {
  const availableLocales = config.localization.locales

  return {
    locales: availableLocales,
    isLoadingLocale,
    currentLocale,
    changeLocale,
    t: i18n.global.t,
  }
}
