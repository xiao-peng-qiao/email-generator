const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
  // 添加process/browser模块的显式映射
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': path.resolve(__dirname, './src/process-browser-webpack.js'),
    'process': path.resolve(__dirname, './src/process-browser-webpack.js'),
    'buffer': require.resolve('buffer/'),
    'stream': require.resolve('stream-browserify'),
    'path': require.resolve('path-browserify'),
    'util': require.resolve('util/'),
    'assert': require.resolve('assert/'),
  };

  // 为了解决 "process is not defined" 错误
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: path.resolve(__dirname, './src/process-browser-webpack.js'),
      Buffer: ['buffer', 'Buffer'],
    }),
    // 显式定义process环境变量
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ];

  // 为node核心模块提供垫片
  config.node = {
    process: true,
    Buffer: true,
    global: true,
  };

  return config;
}; 