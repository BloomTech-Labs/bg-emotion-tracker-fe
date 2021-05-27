const config = require('./src/styles/theme-overrides.js');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: config,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  eslint: {
    // mode: ESLINT_MODES.extends,
    configure: () => {
      // Workaround for broken ESLINT_MODES.file mode
      return require('./.eslintrc');
    },
  },
};
