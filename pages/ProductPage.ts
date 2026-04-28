import { expect, Page } from '@playwright/test';

// Page Object for Products Page
export class ProductPage {
  constructor(private page: Page) {}

  // Navigate to products page
  async goto() {
    await this.page.goto('/all-products');
  }

  // Click Products link from navigation
  async openFromNavigation() {
    await this.page.getByRole('link', { name: 'Products' }).click();
  }

  // Verify products page is loaded
  async expectProductsPageVisible() {
    await expect(this.page).toHaveURL(/all-products/);
    await expect(this.page.getByText(/products/i)).toBeVisible();
  }

  // Get product items list
  getProductItems() {
    return this.page.getByRole('link').filter({ hasText: /.+/ });
  }

  // Verify at least one product exists
  async expectProductsExist() {
    const items = this.getProductItems();

    await expect(items.first()).toBeVisible();

    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  }

  // Open first product
  async openFirstProduct() {
    await this.getProductItems().first().click();
  }

  // Verify product detail page
  async expectProductDetailVisible() {
    await expect(this.page).not.toHaveURL(/all-products/);
    await expect(
      this.page.getByText(/add to cart|price|product/i)
    ).toBeVisible();
  }
}