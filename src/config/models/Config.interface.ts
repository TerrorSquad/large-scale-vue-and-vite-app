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

  httpClient: HttpClientConfigInterface

  apiClient: {
    type: string
  }

  items: {
    apiClientOptions: ItemsApiClientOptions
  }
}
