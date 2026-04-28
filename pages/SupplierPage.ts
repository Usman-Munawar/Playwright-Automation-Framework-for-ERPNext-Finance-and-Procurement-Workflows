import { expect, Page } from '@playwright/test';

// Page Object for Supplier Details (Protected Page)
export class SupplierPage {
  constructor(private page: Page) {}

  // Open Supplier Details from navigation
  async openFromNavigation() {
    await this.page.getByRole('link', { name: 'Supplier Details' }).click();
  }

  // Verify user is redirected/stays on login page
  async expectLoginRequired() {
    await expect(this.page).toHaveURL(/login/);

    await expect(
      this.page.getByRole('heading', { name: 'Login to Frappe' })
    ).toBeVisible();
  }
}