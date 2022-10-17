/** @type {import('jest').Config} */
export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  preset: "ts-jest",
  resolver: "ts-jest-resolver",
  testMatch: ["**/__tests__/**/*.test.ts"],
}
