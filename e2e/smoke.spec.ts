import { test, expect } from '@playwright/test'
import paths from './smoke-paths.json'

for (const path of paths as string[]) {
  test(`smoke ${path}`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', (e) => errors.push(String(e)))
    const res = await page.goto(path, { waitUntil: 'domcontentloaded' })
    expect(res, `pas de réponse pour ${path}`).toBeTruthy()
    expect(res!.status(), `HTTP ${path}`).toBeLessThan(400)
    await expect(page.locator('text=Application error')).toHaveCount(0) // error boundary Next
    await expect(page.locator('body')).toBeVisible()
    const severe = errors.filter((e) => !/favicon|analytics|gtag|posthog|clarity|third-party/i.test(e))
    expect(severe, `erreurs console sur ${path}:\n${severe.join('\n')}`).toEqual([])
  })
}
