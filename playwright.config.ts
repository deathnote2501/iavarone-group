import { defineConfig } from '@playwright/test'

const PORT = Number(process.env.PORT || 3119)

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: `http://localhost:${PORT}`, headless: true },
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
})
