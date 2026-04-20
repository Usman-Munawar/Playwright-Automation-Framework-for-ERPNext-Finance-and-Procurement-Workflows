import { test, expect } from '@playwright/test';

// Test 1: Verify user can open Contact page from top navigation
test('user can open Contact page from top navigation', async ({ page }) => {
  // Step 1: Open base page
  await page.goto('/login');

  // Step 2: Click Contact link from top navigation
  await page.getByRole('link', { name: 'Contact' }).click();

  // Step 3: Verify URL changed correctly
  await expect(page).toHaveURL(/contact/);

  // Step 4: Verify contact page heading is visible
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
});

// Test 2: Verify contact form fields are visible
test('contact page should show form fields and send button', async ({ page }) => {
  // Step 1: Open Contact page directly
  await page.goto('/contact');

  // Step 2: Scope to main content to avoid matching footer elements
  const main = page.locator('main');

  // Step 3: Verify page heading
  await expect(main.getByRole('heading', { name: 'Contact Us' })).toBeVisible();

  // Step 4: Verify subject/category dropdown is visible
  await expect(main.getByRole('combobox')).toBeVisible();

  // Step 5: Verify email field is visible
  await expect(
    main.getByRole('textbox', { name: 'Your email address', exact: true })
  ).toBeVisible();

  // Step 6: Verify message field is visible
  await expect(main.getByRole('textbox').nth(1)).toBeVisible();

  // Step 7: Verify Send button is visible
  await expect(main.getByRole('button', { name: 'Send' })).toBeVisible();
});


// Test 3: Verify validation message appears when submitting empty contact form
test('contact form should show validation dialog when submitted empty', async ({ page }) => {
  // Step 1: Open contact page
  await page.goto('/contact');

  // Step 2: Scope to main content
  const main = page.locator('main');

  // Step 3: Click Send without filling the form
  await main.getByRole('button', { name: 'Send' }).click();

  // Step 4: Verify validation dialog appears with expected message
  await expect(page.getByRole('heading', { name: 'Message' })).toBeVisible();
  await expect(
    page.getByText(/please enter both your email and message/i)
  ).toBeVisible();
});