// https://github.com/playwright-community/jest-playwright/#configuration

const port = 8080;

module.exports = {
  browsers: ["chromium", "firefox", "webkit"],
  exitOnPageError: false,
  launchOptions: {
    headless: true
  },
  serverOptions: {
    port,
    command: 'npm run dev',
    launchTimeout: 180000,
    waitOnScheme: {
      resources: [`http://localhost:${port}`],
    },
  }
}
