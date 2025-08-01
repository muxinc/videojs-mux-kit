https://jestjs.io/docs/configuration

module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ["**/e2e/**.test.js"],
  testTimeout: 50000,
  verbose: true,
};
