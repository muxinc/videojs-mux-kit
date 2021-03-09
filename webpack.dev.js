const { merge }  = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');

var devConfig = merge(config, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './'
  }
});

devConfig = merge(devConfig, {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'post',
        include: [
          path.resolve(__dirname, 'lib')
        ],
        loader: 'istanbul-instrumenter-loader'
      }
    ]
  }
});

module.exports = devConfig;
