module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|svg)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx,js,jsx}",
    "!**/*.{test,spec}.{ts,tsx,js,jsx}",
    "!**/*.d.ts",
    "!**/*.stories.{ts,tsx,js,jsx}",
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["<rootDir>/src/utils/types"],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/src/testMocks/localStorageMock.js"],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
};
