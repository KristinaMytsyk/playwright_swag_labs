import { test, expect } from '@playwright/test';

test('Verify Shopping Cart icon contains the number of products added', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  const firstProduct = await page.locator('.inventory_list > *:first-child');
  await firstProduct.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  const shoppingCartBadge = await page.locator('span.shopping_cart_badge');
  await expect(shoppingCartBadge).toHaveText('1');
});

test('Verify the added product is displayed in the Shopping Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  const firstProduct = await page.locator('.inventory_list > *:first-child');
  const firstProductName = await firstProduct.locator('[data-test="inventory-item-name"]').innerText();
  await firstProduct.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  const cartProductName = await page.locator('[data-test="inventory-item-name"]').innerText();
  expect(cartProductName).toBe(firstProductName);
});

test('Verify no products are available in the Shopping Cart after clicking Remove', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  const firstProduct = await page.locator('.inventory_list > *:first-child');
  await firstProduct.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  const inventoryItem = page.locator('[data-test="inventory-item"]');
  await expect(inventoryItem).not.toBeVisible();
  await expect(inventoryItem).toHaveCount(0);
});