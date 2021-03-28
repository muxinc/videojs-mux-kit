const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globby = require('globby');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

const buildHtmlWebpackConfigs = async () => {
  const demoFiles = await globby(['src/demo/**.html']);

  return demoFiles.map((demoFile) => {
    const demoFileBase = path.parse(demoFile);
    return new HtmlWebpackPlugin({
      template: demoFile,
      inject: true,
      chunks: ['index'],
      filename: `${demoFileBase.name}.html`,
    })
  });
};

module.exports = async () => ({
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
    ...await buildHtmlWebpackConfigs(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
