import axios from 'axios'
import { HttpClientAxios, HttpRequestType, HttpRequestParamsInterface } from '@/http-client'

let mockRequestParams: HttpRequestParamsInterface<any> = {
  requestType: HttpRequestType.get,
  endpoint: 'path/to/a/get/api/endpoint',
  requiresToken: false,
}

describe('HttpClient: axios-client: request: get', () => {
  const httpClient = new HttpClientAxios()

  it('should execute get request successfully', () => {
    vitest.spyOn(axios, 'get').mockImplementation(async () => {
      return Promise.resolve({ data: 'request completed: ' + mockRequestParams.endpoint })
    })

    httpClient
      .request(mockRequestParams)
      .then((response) => {
        expect(response).toEqual('request completed: ' + mockRequestParams.endpoint)
      })
      .catch((e) => {
        console.info('AxiosClient.request.get.test.ts: error', e)
      })
  })

  it('get should throw error on rejection', () => {
    vitest.spyOn(axios, 'get').mockImplementation(async () => {
      return Promise.reject('request completed: ' + mockRequestParams.endpoint)
    })

    httpClient.request(mockRequestParams).catch((e) => {
      expect(e).toBeDefined()
      expect(e.toString()).toEqual('Error: HttpClientAxios: request: exception')
    })
  })
})
