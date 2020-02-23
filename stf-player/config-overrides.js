/* config-overrides.js */
const path = require('path')

module.exports = function override (config, env) {
  config.resolve = {
    ...config.resolve,
    alias: {
      'styled-components': path.resolve('./', 'node_modules', 'styled-components'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  }
  return config
}
