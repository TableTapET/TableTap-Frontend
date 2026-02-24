import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provides the path to your Next.js app to load next.config.js and .env files
  dir: './',
})
 
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // This ensures Jest understands your @/ imports (matching tsconfig.json)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
 
export default createJestConfig(config)