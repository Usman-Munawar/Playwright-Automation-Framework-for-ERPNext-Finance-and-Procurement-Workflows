import { expect, Page } from '@playwright/test';

// Page Object for Contact Page
export class ContactPage {
  constructor(private page: Page) {}

  // Navigate to contact page directly
  async goto() {
    await this.page.goto('/contact');
  }

  // Open Contact page from navigation
  async openFromNavigation() {
    await this.page.getByRole('link', { name: 'Contact' }).click();
  }

  // Scope to main content (avoid footer conflicts)
  private main = () => this.page.locator('main');

  // Verify contact page is loaded
  async expectContactPageVisible() {
    await expect(this.page).toHaveURL(/contact/);
    await expect(
      this.main().getByRole('heading', { name: 'Contact Us' })
    ).toBeVisible();
  }

  // Verify form fields are visible
  async expectFormVisible() {
    await expect(this.main().getByRole('combobox')).toBeVisible();

    await expect(
      this.main().getByRole('textbox', {
        name: 'Your email address',
        exact: true,
      })
    ).toBeVisible();

    await expect(this.main().getByRole('textbox').nth(1)).toBeVisible();

    await expect(
      this.main().getByRole('button', { name: 'Send' })
    ).toBeVisible();
  }

  // Submit empty form
  async submitEmptyForm() {
    await this.main().getByRole('button', { name: 'Send' }).click();
  }

  // Verify validation dialog appears
  async expectValidationDialog() {
    await expect(
      this.page.getByRole('heading', { name: 'Message' })
    ).toBeVisible();

    await expect(
      this.page.getByText(
        /please enter both your email and message/i
      )
    ).toBeVisible();
  }
}