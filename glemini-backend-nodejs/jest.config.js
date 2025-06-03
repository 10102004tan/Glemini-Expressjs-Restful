module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@v1/(.*)$': '<rootDir>/src/v1/$1',
    '^@v2/(.*)$': '<rootDir>/src/v2/$1',
  },
};