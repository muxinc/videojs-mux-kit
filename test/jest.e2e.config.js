https://jestjs.io/docs/configuration

module.exports = {
  testEnvironment: 'node',
  preset: 'jest-playwright-preset',
  testMatch: ["**/e2e/**.test.js"],
  testTimeout: 30000,
};
