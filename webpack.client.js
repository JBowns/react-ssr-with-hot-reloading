const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = merge(common, {
  entry: [
    './src/client/components'
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `assets/[name].css`,
    }),
    new StatsWebpackPlugin('stats.json')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/client.js'
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