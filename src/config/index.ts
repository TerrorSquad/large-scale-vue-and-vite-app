// returns appropriate config based on env VITE_APP_CONFIG

import { ConfigInterface } from './models/Config.interface'

import { configFilesMap } from './config-files-map'

import { getAppConfigKey } from './utils'

// optional: you can console.log the content of import.meta.env to inspect its value:
// console.log(`------ env ---- "${getAppConfigKey()}"`)

if (!configFilesMap.has(getAppConfigKey())) {
  throw new Error(`Config file not found for VITE_APP_CONFIG key: ${getAppConfigKey()}`)
}

export const config: ConfigInterface = configFilesMap.get(getAppConfigKey())!
