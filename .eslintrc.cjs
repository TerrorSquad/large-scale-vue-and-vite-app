module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  plugins: [],
  rules: {},
  overrides: [
    {
      rules: {
        'vue/multi-word-component-names': 'off',
      },
      files: ['**/views/**/*.vue'],
    },
  ],
}
