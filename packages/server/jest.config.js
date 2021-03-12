const { name } = require('./package.json')

module.exports = {
  displayName: name,
  name,
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/domain/**/*.ts',
    '<rootDir>/src/useCases/**/*.ts',
    '<rootDir>/src/controllers/**/*.ts',
    '!<rootDir>/src/domain/errors/*.ts',
    '!<rootDir>/src/useCases/**/*Errors.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: {
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1',
    '^@presenters/(.*)$': '<rootDir>/src/presenters/$1',
    '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@useCases/(.*)$': '<rootDir>/src/useCases/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  }
}
