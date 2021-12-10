export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  globalSetup: '<rootDir>/tests/fixtures/global-setup.ts',
  setupFilesAfterEnv: ['<rootDir>/tests/fixtures/test-setup.ts'],
  globalTeardown: '<rootDir>/tests/fixtures/global-teardown.ts',
  maxWorkers: '50%',
  collectCoverage: true,
  restoreMocks: true,
}