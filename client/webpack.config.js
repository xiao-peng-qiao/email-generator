const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
}; 