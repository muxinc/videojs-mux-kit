const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: [
      './src/index.js',
      './src/demo/preview.js',
      './src/demo/preview.scss',
    ],
  },
  mode: dev ? 'development' : 'production',
  watch: dev,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
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
      template: 'src/demo/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
