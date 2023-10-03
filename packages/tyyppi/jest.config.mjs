/** @type {import('jest').Config} */
export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  resolver: "ts-jest-resolver",
  testMatch: ["**/__tests__/**/*.test.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
}
