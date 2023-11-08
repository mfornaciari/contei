/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  collectCoverage: true,
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleNameMapper: {
    "^.+\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
};
