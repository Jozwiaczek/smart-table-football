// This file fixes problem with duplicated dependencies

const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      'styled-components': path.resolve('./', 'node_modules', 'styled-components'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  };
  return config;
};
