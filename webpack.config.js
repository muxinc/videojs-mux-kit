const path = require('path');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  mode: dev ? 'development' : 'production',
  watch: dev,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'videojs-mux-kit.js',
  },
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
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ],
};
