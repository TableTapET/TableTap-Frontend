import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provides the path to your Next.js app to load next.config.js and .env files
    dir: './',
});

const collectCoverageFrom = [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.{ts,tsx}',
    '!src/app/layout.tsx',
];

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        // This ensures Jest understands your @/ imports (matching tsconfig.json)
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: true,
    collectCoverageFrom,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    coveragePathIgnorePatterns: ['/node_modules/', '/.next/'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};

// nextJest can drop collectCoverageFrom — re-apply it after wrapping
const createConfig = async () => {
    const nextConfig = await createJestConfig(config)();
    return { ...nextConfig, collectCoverageFrom };
};

export default createConfig;
