import { HttpClientInterface } from './models/HttpClient.interface'

import { HttpClientAxios } from './models/HttpClient.axios'
import { HttpClientFetch } from './models/HttpClient.fetch'

export * from './models'

let _httpClient: HttpClientInterface | undefined = undefined

export const useHttpClient = () => {
  if (!_httpClient) {
    // export instance of HttpClientInterface
    const clientType = 'fetch'
    // TODO: Implement another library like axios
    // TODO: Implement a way to switch between libraries in the config file or environment variables
    // const clientType = config.httpClient.clientType
    // later will drive from config
    // if you'd like to use axios, set "clientType": "axios" within the config files httpClient section
    if (clientType === 'fetch') {
      _httpClient = new HttpClientFetch()
    } else if (clientType === 'axios') {
      _httpClient = new HttpClientAxios()
    }
  }
  return _httpClient as HttpClientInterface
}
