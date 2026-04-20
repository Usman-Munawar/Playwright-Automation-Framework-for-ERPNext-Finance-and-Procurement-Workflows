import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('johndoe@mail.com').fill(username);

    await this.page.getByPlaceholder('Password').fill(password);

    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async expectLoginSuccess() {
    await expect(this.page).not.toHaveURL(/login/);
  }
}