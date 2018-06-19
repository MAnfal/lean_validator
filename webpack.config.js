const path = require('path');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

let config = {
  entry: {
    'lean_validator': './src/lean_validator.js',
    'jquery.lean_validator': './src/jquery.lean_validator.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new WebpackCleanupPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
        query: {
          presets: ['env']
        },
      }
    ],
  },

  devServer: {
    contentBase: './dist'
  },

  mode: process.env.NODE_ENV,
};

switch (config.mode) {
  case 'development':
    config.devtool = 'inline-source-map';
    break;
  case 'production':
    config.devtool = 'source-map';
    break;
}

module.exports = config;