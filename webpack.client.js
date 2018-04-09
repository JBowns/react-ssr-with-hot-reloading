const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

let config = merge(common, {
  entry: [
    './src/client/components'
  ],
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/',
    filename: 'client.js'
  }
});

if (process.env.NODE_ENV === 'development') {
  config = merge(config, {
    entry: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

module.exports = config;