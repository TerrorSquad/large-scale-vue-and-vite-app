import { config } from '@/config'
import { ItemsApiClientInterface, ItemsApiClientModel } from '../../models/items'

// instantiate the ItemsApiClient pointing at the url that returns live data
const itemsApiClient: ItemsApiClientInterface = new ItemsApiClientModel(
  config.items.apiClientOptions,
)
// export our instance
export { itemsApiClient }
