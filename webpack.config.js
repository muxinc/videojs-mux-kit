const path = require('path');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: './src/index.js',
    thumbnails: './src/with-thumbnails.js',
  },
  mode: dev ? 'development' : 'production',
  watch: dev,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'video.js': 'video.js/core',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new ESBuildMinifyPlugin()],
  },
  plugins: [
    new ESBuildPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/examples/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/examples/index.html',
      inject: true,
      chunks: ['thumbnails'],
      filename: 'thumbnails.html'
    }),
  ],
};
