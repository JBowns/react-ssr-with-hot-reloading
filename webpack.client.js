const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const mode = process.env.NODE_ENV;

let config = {
  mode,
  entry: [
    './src/client/components'
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
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
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/',
    filename: 'client.js'
  }
};

if (mode === 'development') {
  config = merge(config, {
    entry: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    stats: 'errors-only',
  });
}

if (mode === 'production') {
  config = merge(config, {
    cache: true
  });
}

module.exports = config;