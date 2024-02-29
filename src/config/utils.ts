// helper to read the value of VUE_APP_CONFIG (or VITE_APP_CONFIG if using vite)
export function getAppConfigKey() {
  // Note: Vite uses import.meta.env (reference: https://vitejs.dev/guide/env-and-mode.html)
  // optional: you can console.log the content of import.meta.env to inspect its values like this: console.log('import.meta.env', JSON.stringify(import.meta.env))
  // @ts-ignore
  return (import.meta.env.VITE_APP_CONFIG || '').trim()
}
