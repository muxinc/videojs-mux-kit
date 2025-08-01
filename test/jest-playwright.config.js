// https://github.com/playwright-community/jest-playwright/#configuration

const port = 8080;
const usingVhs = Boolean(process.env.vhs);

module.exports = {
  browsers: [
    {
      browserType: "chromium",
      launchOptions: {
        // run against the chrome channel so that the proper media codecs are available
        channel: 'chrome'
      }
    },
    "firefox"
  ],
  exitOnPageError: false,
  launchOptions: {
    headless: true
  },
  serverOptions: {
    port,
    command: 'npm run dev' + (usingVhs ? ':vhs' : ''),
    launchTimeout: 180000,
    waitOnScheme: {
      resources: [`http://localhost:${port}`],
    },
  }
}

if (!usingVhs) {
  // VHS doesn't run properly on webkit
  // `usingVhs ? '' : 'webkit'` in the `browsers` array above won't work
  // because playwright will use `chromium` as the default when give `''`
  module.exports.browsers.push('webkit');
}
