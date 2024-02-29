import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { HttpRequestParamsInterface } from './HttpRequestParams.interface'
import { HttpClientInterface, HttpClientConfigInterface } from './HttpClient.interface'
import { HttpRequestType, HttpContentTypes } from './Constants'
import { UrlUtils } from './UrlUtils'

/**
 * @name HttpClientAxios
 * @description
 * Wraps http client functionality to avoid directly using a third party npm package like {@link axios}
 * and simplify replacement in the future if such npm package would stop being developed or other reasons
 */
export class HttpClientAxios implements HttpClientInterface {
  async request<R, P = void>(parameters: HttpRequestParamsInterface<P>): Promise<R> {
    const { requestType, endpoint, requiresToken, payload, headers, mockDelay } = parameters

    const fullUrl = UrlUtils.getFullUrlWithParams(endpoint, payload as any)
    console.log('HttpClientAxios: request: fullUrl', fullUrl, payload)

    // set axios options
    const options: AxiosRequestConfig = {
      headers: {},
      maxRedirects: 0,
    }
    if (headers) {
      options.headers = {
        ...options.headers,
        ...headers,
      }
    }

    // set headers authorization
    if (requiresToken && options.headers) {
      options.withCredentials = true
      // optional: you could set Bearer token here
      // options.headers.Authorization = `Bearer ${ JwtHelpers.getJwtToken() }`
    }
    let result!: R
    try {
      switch (requestType) {
        case HttpRequestType.get: {
          const response = await axios.get(fullUrl, options)
          result = response?.data as R
          break
        }
        case HttpRequestType.post: {
          const response = await axios.post(fullUrl, payload, options)
          result = response?.data as R
          break
        }
        case HttpRequestType.put: {
          const response = await axios.put(fullUrl, payload, options)
          result = response?.data as R
          break
        }
        case HttpRequestType.delete: {
          const response = await axios.delete(fullUrl, options)
          result = response?.data as R
          break
        }
        case HttpRequestType.patch: {
          const response = await axios.patch(fullUrl, payload, options)
          result = response?.data as R
          break
        }
        default:
          console.warn('HttpClientAxios: request: requestType not implemented', requestType)
      }
    } catch (e) {
      console.error('HttpClientAxios: request: error', e)
      throw Error('HttpClientAxios: request: exception')
    }

    if ((mockDelay || 0) > 0) {
      return new Promise<R>((resolve) => {
        setTimeout(() => {
          resolve(result)
        }, mockDelay)
      })
    }
    return Promise.resolve(result)
  }
}
