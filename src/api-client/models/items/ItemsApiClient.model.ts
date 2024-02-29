import { ItemsApiClientOptions, ItemsApiClientEndpoints } from '@/api-client/models'
import { ItemsApiClientInterface } from '@/api-client/models/items/ItemsApiClient.interface.ts'
import { ItemInterface } from '@/models/items'
import { useHttpClient, HttpRequestType, HttpRequestParamsInterface } from '@/http-client'
export class ItemsApiClientModel implements ItemsApiClientInterface {
  private readonly endpoints!: ItemsApiClientEndpoints
  private readonly mockDelay: number = 0

  constructor(options: ItemsApiClientOptions) {
    this.endpoints = options.endpoints
    if (options.mockDelay) {
      this.mockDelay = options.mockDelay
    }
  }

  fetchItems(): Promise<ItemInterface[]> {
    const requestParams: HttpRequestParamsInterface<void> = {
      requestType: HttpRequestType.get,
      endpoint: this.endpoints.fetchItems,
      requiresToken: false,
    }
    return useHttpClient().request<ItemInterface[]>(requestParams)
  }
}
