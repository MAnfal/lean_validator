const path = require('path');

let mode = 'development';

module.exports = {
  entry: {
    'lean_validator': './src/lean_validator.js',
    'jquery.lean_validator': './src/jquery.lean_validator.js'
  },
  mode: mode,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    
  },
};