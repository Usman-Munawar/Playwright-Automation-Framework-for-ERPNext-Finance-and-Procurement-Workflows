import { expect, Page } from '@playwright/test';

// Page Object for Blog Page
export class BlogPage {
  constructor(private page: Page) {}

  // Navigate to blog page
  async goto() {
    await this.page.goto('/blog');
  }

  // Open Blog page from navigation
  async openFromNavigation() {
    await this.page.getByRole('link', { name: 'Blog' }).click();
  }

  // Verify blog page is loaded
  async expectBlogPageVisible() {
    await expect(this.page).toHaveURL(/blog/);
    await expect(
      this.page.getByRole('heading', { name: 'Blog' })
    ).toBeVisible();
  }

  // Get blog post items (generic approach)
  getBlogPosts() {
    return this.page.getByRole('link').filter({ hasText: /.+/ });
  }

  // Verify at least one blog post exists
  async expectBlogPostsExist() {
    const posts = this.getBlogPosts();

    await expect(posts.first()).toBeVisible();

    const count = await posts.count();
    expect(count).toBeGreaterThan(0);
  }

  // Open blog detail page directly (more reliable than clicking hidden links)
  async openBlogDetail() {
    await this.page.goto('/blog/general/welcome');
  }

  // Verify blog detail page
  async expectBlogDetailVisible() {
    await expect(this.page).toHaveURL(/\/blog\/general\/welcome/);

    await expect(
      this.page.getByRole('heading', { name: /welcome/i })
    ).toBeVisible();

    await expect(
      this.page.getByText(/my first blog/i)
    ).toBeVisible();
  }
}