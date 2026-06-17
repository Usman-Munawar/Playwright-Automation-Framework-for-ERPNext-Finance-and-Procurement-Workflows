# Playwright Automation Framework for ERPNext Finance and Procurement Workflows

![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Playwright](https://img.shields.io/badge/Testing-Playwright-green)
![Node.js](https://img.shields.io/badge/Node.js-20+-brightgreen)
![License](https://img.shields.io/badge/License-ISC-yellow)

A Playwright-based end-to-end test automation framework for ERPNext workflows, organized with the Page Object Model and configured for HTML reporting, screenshots, videos, and retry traces.

## Overview

This repository uses `@playwright/test` as the core test runner, loads environment variables with `dotenv`, and targets tests from the `tests` directory through a shared Playwright configuration. It runs tests in Chromium, supports parallel execution locally, and enables retries plus trace collection for CI workflows.

## Features

- Playwright Test framework with TypeScript-based configuration.
- Page Object Model classes under `pages/` for reusable UI actions and assertions.
- HTML reporting via Playwright's built-in reporter.
- Automatic evidence collection on failure: screenshots, retained videos, and retry traces.
- Environment-based `baseURL` support through `.env` variables.
- CI-friendly settings such as `forbidOnly`, retries, and single-worker execution when `CI` is set.

## Project Structure

```text
.
├── fixtures/
├── pages/
│   ├── BlogPage.ts
│   ├── ContactPage.ts
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   └── SupplierPage.ts
├── tests/
│   ├── auth/
│   ├── finance/
│   ├── procurement/
│   └── public/
├── playwright.config.ts
├── package.json
├── package-lock.json
├── LICENSE
└── README.me
```

The repository separates page interaction logic into dedicated page objects such as `LoginPage`, `SupplierPage`, `ProductPage`, `ContactPage`, and `BlogPage`, which helps keep tests easier to read and maintain.

## Prerequisites

- Node.js 18 or newer is recommended.
- npm.
- Access to an ERPNext or Frappe-based environment.
- Valid test credentials stored outside source control.

## Installation

```bash
git clone https://github.com/Usman-Munawar/Playwright-Automation-Framework-for-ERPNext-Finance-and-Procurement-Workflows.git
cd Playwright-Automation-Framework-for-ERPNext-Finance-and-Procurement-Workflows
npm install
npx playwright install
```

## Environment Setup

Create a `.env` file in the project root:

```env
BASE_URL=https://your-erpnext-instance.example.com
LOGIN_EMAIL=your-test-user@example.com
LOGIN_PASSWORD=your-secure-password
```

The Playwright configuration reads environment variables with `dotenv.config()` and uses `process.env.BASE_URL` as the shared `baseURL` for test navigation. Keep `.env` out of source control.

## Running Tests

Run the full suite:

```bash
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/<spec-file-name>.spec.ts
```

Run in headed mode for debugging:

```bash
npx playwright test --headed
```

Open the HTML report after execution:

```bash
npx playwright show-report
```

## Test Design

The framework follows the Page Object Model, where reusable actions and assertions live in dedicated classes and tests consume those abstractions instead of low-level selectors.

Example pattern:

```ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectLoginPageVisible();
  await loginPage.login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
});
```

## Configuration Notes

The `playwright.config.ts` file sets `testDir` to `./tests`, enables `fullyParallel`, uses Chromium as the active browser project, and keeps failure artifacts for debugging. It also stores screenshots only on failure, retains videos on failure, and captures traces on first retry.

## Recommended npm Scripts

Add these scripts to `package.json` for easier usage:

```json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "test:ui": "playwright test --ui",
  "report": "playwright show-report"
}
```

## License

This repository is currently licensed under `ISC` according to `package.json`, and includes an MIT-style workflow structure in the repository docs. Confirm the effective license before redistribution.
