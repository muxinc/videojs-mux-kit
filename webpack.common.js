const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const config = {
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

  if (!env.vhs) {
    config.resolve = {
      alias: {
        'video.js': 'video.js/core',
      }
    };
  } else {
    config.resolve = {
      alias: {
        'hls.js': false,
        './tech/hlsjs': false,
        './utils/mux-subtitles': false
      }
    };
  }

  return config;
};
