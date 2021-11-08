const tsPreset = require('ts-jest/jest-preset');

module.exports = {
    ...tsPreset,
    preset: "jest-dynalite",
    moduleNameMapper: {
    },
    testEnvironment: "jest-dynalite/environment",
    testTimeout: 45000,
    testPathIgnorePatterns: ['test/integration/', 'node_modules/'],
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: 'junit',
                outputName: 'report.xml',
            },
        ],
    ],
    setupFiles: [
      './env.jest.js'
    ],
};
