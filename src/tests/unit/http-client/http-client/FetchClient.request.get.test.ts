import { HttpClientFetch, HttpRequestType, HttpRequestParamsInterface } from '@/http-client'
import { fail } from 'assert'
let mockRequestParams: HttpRequestParamsInterface<any> = {
  requestType: HttpRequestType.get,
  endpoint: 'path/to/a/get/api/endpoint',
  requiresToken: false,
}

describe('HttpClient: fetch-client: request: get', () => {
  const httpClient = new HttpClientFetch()

  it('should execute get request succesfully', async () => {
    // could not find an easy way to use spyOn for fetch so overriding global.fetch
    // save original fetch
    const unmockedFetch = global.fetch || (() => {})
    global.fetch = unmockedFetch
    const expectedResult = {
      result: `request completed: ${mockRequestParams.endpoint}`,
    }

    vitest.spyOn(global, 'fetch').mockImplementation(async () =>
      Promise.resolve({
        redirected: false,
        json: () => Promise.resolve(expectedResult),
      } as any),
    )

    httpClient
      .request(mockRequestParams)
      .then((response) => {
        expect(response).not.toBeNull()
        expect(response).toEqual(expectedResult)
      })
      .catch((e) => {
        console.log('FetchClient.request.get.test.ts: error', e)
        fail('FetchClient.request.get.test.ts: error')
      })
    // restore global.fetch
    global.fetch = unmockedFetch
  })
  it('get should throw error on rejection', () => {
    // could not find an easy way to use spyOn for fetch so overriding global.fetch
    // save original fetch
    const unmockedFetch = global.fetch || (() => {})
    global.fetch = unmockedFetch
    vitest.spyOn(global, 'fetch').mockImplementation(async () => Promise.reject())
    httpClient.request(mockRequestParams).catch((error) => {
      expect(error).toBeDefined()
      expect(error.toString()).toEqual('Error: HttpClientFetch: exception')
    })
  })
})
