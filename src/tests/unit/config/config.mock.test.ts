import { ConfigInterface } from '@/config/models/Config.interface'

import { configFilesMap } from '@/config/config-files-map'

// TODO: Add tests for other config files

describe('config: mock', () => {
  const config: ConfigInterface = configFilesMap.get('mock') as ConfigInterface

  it('instance should have a "global" section', () => {
    expect(config).toHaveProperty('global')
  })

  it('instance should have a "httpClient" section', () => {
    expect(config).toHaveProperty('httpClient')
  })

  it('instance should have a "items" section', () => {
    expect(config).toHaveProperty('items')
  })

  describe('global', () => {
    const section = config.global
    it('section should have a "version" property', () => {
      expect(section).toHaveProperty('version')
      expect(typeof section.version).toBe('number')
      expect(section.version).toBeGreaterThan(0)
    })
  })

  describe('localization', () => {
    const section = config.localization

    it('section should have "apiClientOptions" property', () => {
      expect(section).toHaveProperty('apiClientOptions')

      describe('apiClientOptions', () => {
        const apiClientOptions = section.apiClientOptions

        describe('endpoints', () => {
          const endpoints = apiClientOptions.endpoints

          it('should have "fetchLocales" property', () => {
            expect(endpoints).toHaveProperty('fetchTranslation')
            expect(typeof endpoints.fetchTranslation).toBe('string')
            expect(endpoints.fetchLocales.length).toBeGreaterThan(10)
          })
        })
      })
    })

    it('section should have "locales" property', () => {
      expect(section).toHaveProperty('locales')
      expect(Array.isArray(section.locales)).toBe(true)
      expect(section.locales.length).toBeGreaterThan(0)
      // for each element check if it has "key" and "isDefault" properties
      section.locales.forEach((locale) => {
        expect(locale).toHaveProperty('key')
        expect(typeof locale.key).toBe('string')
        expect(locale).toHaveProperty('isDefault')
        expect(typeof locale.isDefault).toBe('boolean')
      })

      // check if there is only one default locale
      const defaultLocales = section.locales.filter((locale) => locale.isDefault)
      expect(defaultLocales.length).toBe(1)

      // check if there are no duplicate keys
      const keys = section.locales.map((locale) => locale.key)
      const uniqueKeys = new Set(keys)
      expect(uniqueKeys.size).toBe(keys.length)
    })

    it('section should have "localStorageCache" property', () => {
      expect(section).toHaveProperty('localStorageCache')
      expect(section.localStorageCache).toHaveProperty('enabled')
      expect(typeof section.localStorageCache.enabled).toBe('boolean')
      expect(section.localStorageCache).toHaveProperty('expirationInMinutes')
      expect(typeof section.localStorageCache.expirationInMinutes).toBe('number')
    })
  })

  describe('httpClient', () => {
    const section = config.httpClient
    it('section should have "tokenKey" property', () => {
      expect(section).toHaveProperty('tokenKey')
    })
    it('section should have "clientType" property', () => {
      expect(section).toHaveProperty('clientType')
    })
  })

  describe('apiClient', () => {
    const section = config.apiClient
    it('section should have "type" property', () => {
      expect(section).toHaveProperty('type')
    })
  })

  describe('items', () => {
    const section = config.items
    it('section should have "apiClientOptions" property', () => {
      expect(section).toHaveProperty('apiClientOptions')
    })

    describe('apiClientOptions', () => {
      const apiClientOptions = section.apiClientOptions

      describe('endpoints', () => {
        const endpoints = apiClientOptions.endpoints
        it('should have "fetchItems" property', () => {
          expect(endpoints).toHaveProperty('fetchItems')
          expect(typeof endpoints.fetchItems).toBe('string')
          expect(endpoints.fetchItems.length).toBeGreaterThan(10)
        })
      })
    })
  })
})
