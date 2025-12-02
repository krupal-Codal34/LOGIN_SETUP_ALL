import { chromium, expect } from '@playwright/test';


export async function loginAndSaveSession(authFilePath: string) {

    // Use a fresh, headless browser instance for the setup login
    const browser = await chromium.launch();
    const page = await browser.newPage(); // Use newPage() on the browser itself


    // 1. Navigate and perform login steps (Adjust selectors for your application)
    await page.goto('https://automationexercise.com');
    await page.locator("[href='/login']").click();

    // Perform Login
    await page.getByRole("textbox", { name: "email" }).first().fill("Test22092024@198.com");
    await page.getByRole("textbox", { name: "password" }).fill("Test22092024@198");
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for post-login state
    await expect(page.getByText("Logout")).toBeVisible({ timeout: 15000 });

    // 4. Save the storage state (cookies, local storage, etc.)
    await page.context().storageState({ path: authFilePath });

    await browser.close();
    console.log(`[AUTH SETUP] Saved session to ${authFilePath}`);
}
const STANDARD_AUTH = "./playwright/.auth/standard-auth.json";

(async () => {
    try {
        await loginAndSaveSession(STANDARD_AUTH);
    } catch (error) {
        console.error("Failed to run loginAndSaveSession:", error);
        process.exit(1); // Exit with a failure code
    }
})();