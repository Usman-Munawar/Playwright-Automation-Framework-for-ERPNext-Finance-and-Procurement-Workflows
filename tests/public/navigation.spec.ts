import { test } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

// Test 1: Verify user can open Products page from top navigation
test('user can open Products page from top navigation', async ({ page }) => {
  const productPage = new ProductPage(page);

  await page.goto('/login');
  await productPage.openFromNavigation();
  await productPage.expectProductsPageVisible();
});

// Test 2: Verify products page contains at least one product
test('products page should show at least one product item', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.goto();
  await productPage.expectProductsPageVisible();
  await productPage.expectProductsExist();
});

// Test 3: Verify user can open a product detail page
test('user can open a product detail page', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.goto();
  await productPage.openFirstProduct();
  await productPage.expectProductDetailVisible();
});

// Test 4: Verify product detail page shows key product information
test('product detail page should show key product information', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.goto();
  await productPage.openFirstProduct();
  await productPage.expectProductDetailVisible();
});