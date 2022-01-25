const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new ESBuildMinifyPlugin({
      target: 'es2015'
    })],
  },
  plugins: [
    new ESBuildPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ]
};
