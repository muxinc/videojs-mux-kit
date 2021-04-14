const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const common = require('./webpack.common');

module.exports = async function () {
  return merge(common, {
    entry: path.resolve(__dirname, "src/index.js"),
    mode: 'production',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      library: "videojs",
      libraryTarget: "umd",
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    }
  });
};
