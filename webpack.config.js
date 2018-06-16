const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'jquery.leanvalidator.js',
    path: path.resolve(__dirname, 'dist')
  }
};
