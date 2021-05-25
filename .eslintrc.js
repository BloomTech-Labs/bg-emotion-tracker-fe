module.exports = {
  extends: ['eslint-config-react-app', 'react-app'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [
    // ...
    'react-hooks',
  ],
  rules: {
    'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'off', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    eqeqeq: 'off',
  },
  overrides: [
    {
      files: ['**/*.js?(x)'],
      rules: {
        //
      },
    },
  ],
};
