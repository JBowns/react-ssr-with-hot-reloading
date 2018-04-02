
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const mode = process.env.NODE_ENV;

let config = {
  mode,
  entry: './src',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
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
  externals: [
    nodeExternals({})
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  }
};

if (mode === 'development') {
  config = merge(config, {
    devtool: 'source-map',
    stats: 'errors-only'
  });
}

if (mode === 'production') {
  config = merge(config, {
    cache: true
  });
}

module.exports = config;