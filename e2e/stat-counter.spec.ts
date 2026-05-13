import { test, expect } from '@playwright/test'

test('counters reach their final values', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByLabel('342 sensitive files')).toBeVisible()
  await expect(page.getByLabel('40,815 links scanned')).toBeVisible()
  await expect(page.getByLabel('$1,284+ saved per month')).toBeVisible()

  await expect(page.getByText('342', { exact: true })).toBeVisible()
  await expect(page.getByText('40,815')).toBeVisible()
  await expect(page.getByText('$1,284+')).toBeVisible()
})

test('reduced motion shows final values without animating', async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto('/')

  // With reduced motion, final values render on the first paint, not after rAF ticks.
  await expect(page.getByText('40,815')).toBeVisible({ timeout: 200 })
  await expect(page.getByText('$1,284+')).toBeVisible({ timeout: 200 })

  await context.close()
})
