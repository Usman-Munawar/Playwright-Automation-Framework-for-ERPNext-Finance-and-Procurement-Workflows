import { test } from '@playwright/test';
import { SupplierPage } from '../../pages/SupplierPage';

// Test 1: Verify Supplier Details page requires authentication
test('supplier details page should require authentication', async ({ page }) => {
  const supplierPage = new SupplierPage(page);

  await page.goto('/login');
  await supplierPage.openFromNavigation();
  await supplierPage.expectLoginRequired();
});