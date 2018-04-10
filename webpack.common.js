const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');

const mode = process.env.NODE_ENV;

let config = {
  mode,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }]
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    publicPath: '/'
  }
};

if (mode === 'development') {
  config = merge(config, {
    devtool: 'source-map',
    stats: 'errors-only',
  });
}

if (mode === 'production') {
  config = merge(config, {
    cache: true,
    stats: {
      colors: true
    }
  });
}

module.exports = config;