import { HttpClientInterface } from './models/HttpClient.interface'

import { config } from '@/config'

import { HttpClientAxios } from './models/HttpClient.axios'
import { HttpClientFetch } from './models/HttpClient.fetch'

export * from './models'

let _httpClient: HttpClientInterface | undefined = undefined

export const useHttpClient = () => {
  if (!_httpClient) {
    // export instance of HttpClientInterface
    // TODO: Implement another library like axios
    const clientType = config.httpClient.clientType
    if (clientType === 'fetch') {
      _httpClient = new HttpClientFetch()
    } else if (clientType === 'axios') {
      _httpClient = new HttpClientAxios()
    }
  }
  return _httpClient as HttpClientInterface
}
