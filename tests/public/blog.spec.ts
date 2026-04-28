import { test } from '@playwright/test';
import { BlogPage } from '../../pages/BlogPage';

// Test 1: Verify user can open Blog page from navigation
test('user can open Blog page from top navigation', async ({ page }) => {
  const blogPage = new BlogPage(page);

  await page.goto('/login');
  await blogPage.openFromNavigation();
  await blogPage.expectBlogPageVisible();
});

// Test 2: Verify blog page shows at least one blog post
test('blog page should show at least one blog post', async ({ page }) => {
  const blogPage = new BlogPage(page);

  await blogPage.goto();
  await blogPage.expectBlogPageVisible();
  await blogPage.expectBlogPostsExist();
});

// Test 3: Verify user can open a blog post
test('user can open a blog post', async ({ page }) => {
  const blogPage = new BlogPage(page);

  await blogPage.openBlogDetail();
  await blogPage.expectBlogDetailVisible();
});