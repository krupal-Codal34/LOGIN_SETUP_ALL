import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });




export default defineConfig({


// Commnent out below line for the other setup to run rather than global setup
  // // globalSetup: path.resolve('./global-setup.ts'),
  // globalTeardown: path.resolve('./global-teardown.ts'),
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://automationexercise.com/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "standard-user",
      testDir: "./tests", // Run tests only in this folder
      use: {
                baseURL: "https://automationexercise.com",
        // storageState: "./playwright/.auth/standard-auth.json", // comment it out when using fixtures to in built loginAndSaveSession
        // Set the fixture option 'userRole' to 'standard' for these tests
        userRole: "standard",
      },
    },
    {
      name: "admin-user",
      testDir: "./tests", // Run tests only in this folder
      use: {
        baseURL: "https://automationexercise.com",
        // storageState: "./playwright/.auth/standard-auth.json", // comment it out when using fixtures to in built loginAndSaveSession
        // Set the fixture option 'userRole' to 'admin' for these tests
        userRole: "admin",
      },
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: "https://automationexercise.com",
        storageState: "./playwright/.auth/admin-auth.json",
        

      },
    },

    /* Test against mobile viewports. */
    {
      name: 'MobileChrome',
      use: {
        ...devices['Pixel 5'],
        baseURL: "https://automationexercise.com",
        storageState: "./playwright/.auth/standard-auth.json",
      },

    },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
