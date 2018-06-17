const path = require('path');

module.exports = {
  entry: {
    'lean_validator': './src/lean_validator.js',
    'jquery.lean_validator': './src/jquery.lean_validator.js'
  },
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {

  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
};