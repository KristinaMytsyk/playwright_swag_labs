import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
});

test('Products title is displayed', async ({ page }) => {
  // await page.goto('/');
  // await page.getByTestId('username').fill('standard_user');
  // await page.getByTestId('password').fill('secret_sauce');
  // await page.getByTestId('login-button').click();
  await expect(page.getByTestId('title')).toBeVisible();
});

test('Shopping Cart icon is displayed', async ({ page }) => {
    // await page.goto('/');
    // await page.getByTestId('username').fill('standard_user');
    // await page.getByTestId('password').fill('secret_sauce');
    // await page.getByTestId('login-button').click();
    await expect(page.locator('#shopping_cart_container')).toBeVisible();
  });

test('More than 1 product is displayed', async ({ page }) => {
    // await page.goto('/');
    // await page.getByTestId('username').fill('standard_user');
    // await page.getByTestId('password').fill('secret_sauce');
    // await page.getByTestId('login-button').click();
    const products = await page.locator('.inventory_item');
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(1);
  });