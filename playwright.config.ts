import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

const testEnvPath = process.env.DOTENV_CONFIG_PATH || '.env.test'

dotenv.config({ path: testEnvPath })

export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: {
    command: 'node -r dotenv/config node_modules/next/dist/bin/next dev --port 3000',
    env: {
      DOTENV_CONFIG_PATH: testEnvPath,
      NODE_OPTIONS: '--no-deprecation',
    },
    reuseExistingServer: true,
    port: 3000,
  },
})
