import { config } from '@/config'
import {
  ApiClientInterface,
  LocalizationApiClientModel,
  ItemsApiClientModel,
} from '@/api-client/models'

// create an instance of our main ApiClient that wraps the mock child clients
const apiMockClient: ApiClientInterface = {
  items: new ItemsApiClientModel(config.items.apiClientOptions),
  localization: new LocalizationApiClientModel(config.localization.apiClientOptions),
}

export { apiMockClient }
