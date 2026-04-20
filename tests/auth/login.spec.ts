import { test, expect } from '@playwright/test';

test('login page UI should be visible', async ({ page }) => {
  await page.goto('/login');

  const loginForm = page.locator('form');

  await expect(loginForm.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(loginForm.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(loginForm.getByRole('button', { name: 'Login' })).toBeVisible();
});



test('should show validation or error for invalid login', async ({ page }) => {
  await page.goto('/login');

  const loginForm = page.locator('form');

  await loginForm.getByRole('textbox', { name: 'Email' }).fill('wrong@example.com');
  await loginForm.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
  await loginForm.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/login|app|forgot/i);
});