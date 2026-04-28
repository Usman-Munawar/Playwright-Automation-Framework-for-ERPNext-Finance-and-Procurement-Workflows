import { test, expect } from '@playwright/test';

// Test 1: Verify user can open Blog page from navigation
test('user can open Blog page from top navigation', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('link', { name: 'Blog' }).click();

  await expect(page).toHaveURL(/blog/);
  await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
});

// Test 2: Verify blog page shows at least one blog post
test('blog page should show at least one blog post', async ({ page }) => {
  // Step 1: Open blog page directly
  await page.goto('/blog');

  // Step 2: Verify page loaded
  await expect(page).toHaveURL(/blog/);

  // Step 3: Find blog post links
  const blogPosts = page.getByRole('link').filter({ hasText: /.+/ });

  // Step 4: Ensure at least one post exists
  await expect(blogPosts.first()).toBeVisible();

  const count = await blogPosts.count();
  expect(count).toBeGreaterThan(0);
});

// Test 3: Verify user can open a blog post detail page
test('user can open a blog post', async ({ page }) => {
  // Step 1: Open blog detail page directly
  await page.goto('/blog/general/welcome');

  // Step 2: Verify correct blog detail URL
  await expect(page).toHaveURL(/\/blog\/general\/welcome/);

  // Step 3: Verify blog post heading is visible
  await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();

  // Step 4: Verify blog content is visible
  await expect(page.getByText(/my first blog/i)).toBeVisible();
});