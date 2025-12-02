// import { test as base, expect } from "@playwright/test";
import { test, expect } from '../fixtures.js';
// Reset storage state for this file to avoid being authenticated
// test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Stored logged using inbuilt fixture on the file', () => {

    test("TestCase01", async ({ page }) => {
        //   const page = await webContext.newPage();

        await page.goto("https://automationexercise.com/");
        const btn_Logout = page.getByText("Logout");
        await expect(btn_Logout).toBeVisible({ timeout: 5000 });

        // Assert that the page title matches the expected title after login
        await expect(page).toHaveTitle("Automation Exercise");
        console.log("Automation Exercise 01");
    });

    test("TestCase02", async ({ page }) => {
        //   const page = await webContext.newPage();

        await page.goto("https://automationexercise.com/");
        const btn_Logout = page.getByText("Logout");
        await expect(btn_Logout).toBeVisible({ timeout: 5000 });

        // Assert that the page title matches the expected title after login
        await expect(page).toHaveTitle("Automation Exercise");
        console.log("Automation Exercise 02");
    });
})