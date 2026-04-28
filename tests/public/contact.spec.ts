import { test } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';

// Test 1: Verify user can open Contact page from top navigation
test('user can open Contact page from top navigation', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await page.goto('/login');
  await contactPage.openFromNavigation();
  await contactPage.expectContactPageVisible();
});

// Test 2: Verify contact form fields are visible
test('contact page should show form fields and send button', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.goto();
  await contactPage.expectContactPageVisible();
  await contactPage.expectFormVisible();
});

// Test 3: Verify validation message appears when submitting empty contact form
test('contact form should show validation dialog when submitted empty', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.goto();
  await contactPage.submitEmptyForm();
  await contactPage.expectValidationDialog();
});