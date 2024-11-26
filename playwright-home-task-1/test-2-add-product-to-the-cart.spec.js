import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
});

test('Verify Shopping Cart icon contains the number of products added', async ({ page }) => {
  // await page.goto('/');
  // await page.getByTestId('username').fill('standard_user');
  // await page.getByTestId('password').fill('secret_sauce');
  // await page.getByTestId('login-button').click();
  //const firstProduct = await page.locator('.inventory_list > *:first-child');
  //PW method:
  const firstProduct = await page.locator('.inventory_list').first();
  await firstProduct.getByTestId('add-to-cart-sauce-labs-backpack').click();
  const shoppingCartBadge = await page.locator('span.shopping_cart_badge');
  await expect(shoppingCartBadge).toHaveText('1');
});

test('Verify the added product is displayed in the Shopping Cart', async ({ page }) => {
  // await page.goto('/');
  // await page.getByTestId('username').fill('standard_user');
  // await page.getByTestId('password').fill('secret_sauce');
  // await page.getByTestId('login-button').click();
  const firstProduct = await page.locator('.inventory_list > *:first-child');
  const firstProductName = await firstProduct.getByTestId('inventory-item-name').innerText();
  await firstProduct.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();
  //const cartProductName = await page.getByTestId('inventory-item-name').innerText();
  //expect(cartProductName).toBe(firstProductName);
  //Or we can use assertion that waits until condition is met (EugenePetrik)):
  await expect(page.getByTestId('inventory-item-name')).toHaveText(firstProductName);
});

test('Verify no products are available in the Shopping Cart after clicking Remove', async ({ page }) => {
  // await page.goto('/');
  // await page.getByTestId('username').fill('standard_user');
  // await page.getByTestId('password').fill('secret_sauce');
  // await page.getByTestId('login-button').click();
  const firstProduct = await page.locator('.inventory_list > *:first-child');
  await firstProduct.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('remove-sauce-labs-backpack').click();
  const inventoryItem = page.getByTestId('inventory-item');
  await expect(inventoryItem).not.toBeVisible();
  await expect(inventoryItem).toHaveCount(0);
});