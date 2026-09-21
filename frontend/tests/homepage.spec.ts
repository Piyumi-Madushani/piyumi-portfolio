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