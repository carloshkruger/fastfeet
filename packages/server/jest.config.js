const { name } = require('./package.json')

module.exports = {
  displayName: name,
  name,
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/useCases/**/*.ts',
    '<rootDir>/src/**/domain/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1'
  }
}
