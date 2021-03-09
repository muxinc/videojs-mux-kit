// Karma configuration

module.exports = function (config) {
  // default settings for when it's run locally
  var settings = {
    basePath: '',

    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 4 * 60 * 1000, // default 10000
    captureTimeout: 4 * 60 * 1000, // default 60000

    frameworks: ['mocha', 'detectBrowsers'],
    autoWatch: process.env.WATCH,
    singleRun: !process.env.WATCH,

    // list of files / patterns to load in the browser
    files: [
      '../test/**/*.test.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: require('../webpack.dev.js'),

    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      postDetection: function (availableBrowsers) {
        let result = availableBrowsers;

        // If detectBrowsers finds IE, override it by
        // removing it from the list of browsers to test
        const ieIndex = result.indexOf('IE');

        if(ieIndex !== -1) result.splice(ieIndex, 1);

        return result;
      }
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      reporters: [
        {
          type: 'text-summary'
        }
      ]
    },

    // web server port
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  config.set(settings);
};
