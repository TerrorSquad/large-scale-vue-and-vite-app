import axios from 'axios'
import { HttpClientAxios, HttpRequestType, HttpRequestParamsInterface } from '@/http-client'
import { fail } from 'assert'

let mockRequestParams: HttpRequestParamsInterface<any> = {
  requestType: HttpRequestType.post,
  endpoint: 'path/to/a/post/api/endpoint',
  requiresToken: false,
  payload: {},
}

type P = typeof mockRequestParams.payload

describe('HttpClient: axios-client: request: post', () => {
  const httpClient = new HttpClientAxios()

  it('should execute post request successfully', () => {
    vitest.spyOn(axios, 'post').mockImplementation(async () => {
      return Promise.resolve({ data: 'request completed: ' + mockRequestParams.endpoint })
    })

    httpClient
      .request<string, P>(mockRequestParams)
      .then((response) => {
        expect(response).toEqual('request completed: ' + mockRequestParams.endpoint)
      })
      .catch((e) => {
        fail('AxiosClient.request.post.test.ts: error')
      })
  })

  it('post should throw error on rejection', () => {
    vitest.spyOn(axios, 'post').mockImplementation(async () => {
      return Promise.reject('request completed: ' + mockRequestParams.endpoint)
    })

    httpClient.request(mockRequestParams).catch((e) => {
      expect(e).toBeDefined()
      expect(e.toString()).toEqual('Error: HttpClientAxios: request: exception')
    })
  })
})
