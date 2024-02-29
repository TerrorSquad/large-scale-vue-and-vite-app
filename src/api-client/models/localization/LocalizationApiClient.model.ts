import { useHttpClient, HttpRequestParamsInterface, HttpRequestType } from '@/http-client'
import {
  LocalizationApiClientOptions,
  LocalizationApiClientEndpoints,
} from './LocalizationApiClientOptions.interface'
import { LocalizationApiClientInterface } from './LocalizationApiClient.interface'

export class LocalizationApiClientModel implements LocalizationApiClientInterface {
  private readonly endpoints!: LocalizationApiClientEndpoints
  private readonly mockDelay: number = 0

  constructor(options: LocalizationApiClientOptions) {
    this.endpoints = options.endpoints
    this.mockDelay = options.mockDelay || this.mockDelay
  }

  fetchTranslation(namespace: string, key: string): Promise<{ [key: string]: string }> {
    const requestParameters: HttpRequestParamsInterface = {
      requestType: HttpRequestType.get,
      endpoint: this.endpoints.fetchTranslation,
      mockDelay: this.mockDelay,
      requiresToken: false,
      payload: {
        namespace,
        key,
      } as any,
    }

    return useHttpClient().request<{ [key: string]: string }>(requestParameters)
  }
}
