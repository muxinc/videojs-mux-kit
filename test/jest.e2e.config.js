https://jestjs.io/docs/configuration

module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ["**/e2e/**.test.js"],
  testTimeout: 30000,
  verbose: true,
};
