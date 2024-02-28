import { ApiClientInterface } from './models'
import { apiMockClient } from './mock'
import { apiLiveClient } from './live'

let env: string = 'mock'

console.log('import.meta.env', JSON.stringify(import.meta.env))
if (import.meta.env?.VITE_API_CLIENT) {
  env = import.meta.env.VITE_API_CLIENT.trim()
}

// return either the live or the mock client
const apiClient: ApiClientInterface = env === 'mock' ? apiMockClient : apiLiveClient
export { apiClient }
