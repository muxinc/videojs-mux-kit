const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globby = require('globby');
const path = require('path');

const common = require('./webpack.common');

const buildHtmlWebpackConfigs = async function () {
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

module.exports = async function(env) {
  return merge(common(env), {
    entry: {
      index: [
        './src/entry.js',
        './src/demo/preview.js',
        './src/demo/preview.scss',
      ],
    },
    mode: 'development',
    watch: true,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        }
      ]
    },
    plugins: [
      ...await buildHtmlWebpackConfigs(),
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('DevServerMessagePlugin', (stats) => {
            if (process.env.WEBPACK_DEV_SERVER) {
              const port = process.env.PORT || 8080;
              setTimeout(() => {
                // eslint-disable-next-line no-console
                console.log(`\n\x1b[1m\x1b[32m🚀  Dev server running on: \x1b[4mhttp://localhost:${port}\x1b[0m  🌐\n`);
              }, 0);
            }
          });
        }
      }
    ]
  });
};
