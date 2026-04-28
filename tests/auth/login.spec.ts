import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

// Test 1: Verify login page UI elements are visible
test('login page UI should be visible', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectLoginPageVisible();
});

// Test 2: Verify invalid login shows proper error message
test('should show error for invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login('wrong@example.com', 'wrongpassword');

  await loginPage.expectInvalidLoginMessage();
});