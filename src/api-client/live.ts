import { config } from '@/config'

import {
  ApiClientInterface,
  ItemsApiClientModel,
  LocalizationApiClientModel,
} from '@/api-client/models'

// create an instance of our main ApiClient that wraps the live child clients
const apiLiveClient: ApiClientInterface = {
  items: new ItemsApiClientModel(config.items.apiClientOptions),
  localization: new LocalizationApiClientModel(config.localization.apiClientOptions),
}
// export our instance
export { apiLiveClient }
