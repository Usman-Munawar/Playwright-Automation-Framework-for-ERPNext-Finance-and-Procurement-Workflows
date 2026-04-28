import { expect, Page } from '@playwright/test';

// Page Object for Login Page
export class LoginPage {
  constructor(private page: Page) {}

  // Scoped locator for login form (helps avoid footer or other inputs)
  private loginForm = () => this.page.locator('form');

  // Navigate to login page
  async goto() {
    await this.page.goto('/login');
  }

  // Verify login page UI elements are visible
  async expectLoginPageVisible() {
    // Verify page heading
    await expect(
      this.page.getByRole('heading', { name: 'Login to Frappe' })
    ).toBeVisible();

    // Verify email field
    await expect(
      this.loginForm().getByRole('textbox', { name: 'Email' })
    ).toBeVisible();

    // Verify password field
    await expect(
      this.loginForm().getByRole('textbox', { name: 'Password' })
    ).toBeVisible();

    // Verify login button
    await expect(
      this.loginForm().getByRole('button', { name: 'Login' })
    ).toBeVisible();
  }

  // Perform login action
  async login(email: string, password: string) {
    // Fill email
    await this.loginForm()
      .getByRole('textbox', { name: 'Email' })
      .fill(email);

    // Fill password
    await this.loginForm()
      .getByRole('textbox', { name: 'Password' })
      .fill(password);

    // Click login button
    await this.loginForm()
      .getByRole('button', { name: 'Login' })
      .click();
  }

  // Verify invalid login message is shown
  async expectInvalidLoginMessage() {
    await expect(
      this.loginForm().getByRole('button', {
        name: /invalid login\. try again\./i,
      })
    ).toBeVisible();
  }
}