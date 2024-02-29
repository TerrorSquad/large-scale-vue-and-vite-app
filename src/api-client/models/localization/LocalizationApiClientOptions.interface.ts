export interface LocalizationApiClientEndpoints {
  fetchTranslation: string
}

/**
 * @Name LocalizationApiClientOptions
 * @description
 * Interface for the Localization api client options (includes endpoints used to avo\
id hard-coded strings)
 */
export interface LocalizationApiClientOptions {
  mockDelay?: number
  endpoints: LocalizationApiClientEndpoints
}
