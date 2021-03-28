https://jestjs.io/docs/configuration

module.exports = {
  testMatch: ["**/integrations/**/*.test.js"],
  transform: {
    "^.+\\.js?$": "esbuild-jest"
  }
};
