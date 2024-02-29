import { ItemsApiClientOptions } from '@/api-client/models'

export interface HttpClientConfigInterface {
  tokenKey: string
  clientType: string
}

export interface ConfigInterface {
  global: {
    // ... things that are not domain specific
    version: number
  }

  localization: {
    apiClientOptions: LocalizationApiClientOptions
    locales: { key: string; isDefault: boolean }[]
    localStorageCache: { enabled: boolean; expirationInMinutes: number }
  }

  httpClient: HttpClientConfigInterface

  apiClient: {
    type: string
  }

  items: {
    apiClientOptions: ItemsApiClientOptions
  }
}
