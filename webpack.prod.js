const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const common = require('./webpack.common');

module.exports = async function (env) {
  return merge(common(env), {
    entry: path.resolve(__dirname, "src/entry.js"),
    mode: 'production',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: env.vhs ? "index.vhs.js" : "index.js",
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
