import type {Config} from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/src/**/*.test.ts"],
    moduleFileExtensions: ["ts", "js"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
    coveragePathIgnorePatterns: ["node_modules",
        "src/validators",
        "src/routes",
        "src/config",
        "src/index",
    ],
}

export default config