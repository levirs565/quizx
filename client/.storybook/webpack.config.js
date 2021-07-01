const merge = require('webpack-merge');
const vueConfig = require('@vue/cli-service/webpack.config');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  var newConfig = config;
  newConfig.resolve = merge(vueConfig.resolve, config.resolve);
  newConfig.module = vueConfig.module;

  // Return the altered config
  return newConfig;
};
