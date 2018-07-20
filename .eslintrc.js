module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['babel'],
  rules: {
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'react/forbid-prop-types': 'off',
    'function-paren-newline': ['error', 'consistent'],
    'linebreak-style': ["error", "windows"],
    'quotes': ["error", "single"]
  },
  env: {
    jest: true,
  },
  "globals": {"fetch": false},
};