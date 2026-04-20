import { test, expect } from '@playwright/test';

// Test 1: Verify navigation from login page to Products page
test('user can open Products page from top navigation', async ({ page }) => {
  // Step 1: Open base page (login page where navigation is visible)
  await page.goto('/login');

  // Step 2: Click on "Products" link in top navigation
  await page.getByRole('link', { name: 'Products' }).click();

  // Step 3: Verify URL changed correctly
  await expect(page).toHaveURL(/all-products/);

  // Step 4: Verify page content is loaded (basic UI validation)
  await expect(page.getByText(/products/i)).toBeVisible();
});


// Test 2: Verify products page contains at least one product
test('products page should show at least one product item', async ({ page }) => {
  // Step 1: Directly open products page
  await page.goto('/all-products');

  // Step 2: Confirm correct page is loaded
  await expect(page).toHaveURL(/all-products/);
  await expect(page.getByText(/products/i)).toBeVisible();

  // Step 3: Find all visible links that represent product items
  // (using generic link filtering since exact selectors are not stable yet)
  const productItems = page.getByRole('link').filter({ hasText: /.+/ });

  // Step 4: Ensure at least one product is visible
  await expect(productItems.first()).toBeVisible();

  // Step 5: Count total products and verify it's greater than 0
  const count = await productItems.count();
  expect(count).toBeGreaterThan(0);
});

test('user can open a product detail page', async ({ page }) => {
  // Step 1: Open products page
  await page.goto('/all-products');

  // Step 2: Get list of product links
  const productItems = page.getByRole('link').filter({ hasText: /.+/ });

  // Step 3: Click the first product
  await productItems.first().click();

  // Step 4: Verify navigation happened (URL should change)
  await expect(page).not.toHaveURL(/all-products/);

  // Step 5: Verify product detail content is visible
  await expect(page.getByText(/add to cart|price|product/i)).toBeVisible();
});

test('product detail page should show key product information', async ({ page }) => {
  // Step 1: Open products page
  await page.goto('/all-products');

  // Step 2: Find product links and open the first one
  const productItems = page.getByRole('link').filter({ hasText: /.+/ });
  await productItems.first().click();

  // Step 3: Confirm user is no longer on product listing page
  await expect(page).not.toHaveURL(/all-products/);

  // Step 4: Check that important product info is visible
  await expect(page.getByText(/add to cart|price|product/i)).toBeVisible();
});