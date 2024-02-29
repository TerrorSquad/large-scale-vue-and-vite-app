import { apiMockClient } from './mock'
import { apiLiveClient } from './live'

import { config } from '@/config'

// return either the live or the mock client
const apiClient = config.apiClient.type === 'live' ? apiLiveClient : apiMockClient
export { apiClient }
