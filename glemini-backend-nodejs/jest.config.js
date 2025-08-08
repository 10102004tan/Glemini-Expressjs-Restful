module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@v1/(.*)$': '<rootDir>/src/v1/$1',
    '^@v2/(.*)$': '<rootDir>/src/v2/$1',
  },
  testMatch:[
    "**/v2/__tests__/**/*.test.js",
  ],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ]
};