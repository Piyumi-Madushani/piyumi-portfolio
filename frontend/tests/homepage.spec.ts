import { test, expect } from "@playwright/test";

test("portfolio homepage loads successfully", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Piyumi Madushani/i);
});

test("portfolio contains main sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#home")).toBeVisible();
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator("#projects")).toBeVisible();
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("portfolio works on mobile", async ({ page }) => {
  await page.setViewportSize({
    width: 375,
    height: 812,
  });

  await page.goto("/");

  await expect(page.locator("#home")).toBeVisible();
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator("#projects")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();

  // Check that the page does not overflow horizontally.
  const bodyWidth = await page.locator("body").evaluate(
    (element) => element.scrollWidth
  );

  const viewportWidth = await page.evaluate(
    () => window.innerWidth
  );

  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
});

test("portfolio works on tablet", async ({ page }) => {
  await page.setViewportSize({
    width: 768,
    height: 1024,
  });

  await page.goto("/");

  await expect(page.locator("#home")).toBeVisible();
  await expect(page.locator("#projects")).toBeVisible();
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();

  const bodyWidth = await page.locator("body").evaluate(
    (element) => element.scrollWidth
  );

  const viewportWidth = await page.evaluate(
    () => window.innerWidth
  );

  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
});

test("portfolio works on desktop", async ({ page }) => {
  await page.setViewportSize({
    width: 1440,
    height: 900,
  });

  await page.goto("/");

  await expect(page.locator("#home")).toBeVisible();
  await expect(page.locator("#projects")).toBeVisible();
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();

  const bodyWidth = await page.locator("body").evaluate(
    (element) => element.scrollWidth
  );

  const viewportWidth = await page.evaluate(
    () => window.innerWidth
  );

  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
});