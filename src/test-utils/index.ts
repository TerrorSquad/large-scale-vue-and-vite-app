import { render } from '@testing-library/vue'

const customRender = <T>(ui: T, options = {}) => {
  return render(ui, { ...options })
}

export * from '@testing-library/vue'

export { default as userEvent } from '@testing-library/user-event'
// override render method
export { customRender as render }
