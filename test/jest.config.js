https://jestjs.io/docs/configuration

module.exports = {
  testEnvironment: 'node',
  preset: 'jest-playwright-preset',
  testMatch: ["**.test.js"],
  testTimeout: 10000,
  // verbose: true
};
