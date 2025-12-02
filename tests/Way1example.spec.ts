// import { test} from '../sessionStorageFixture';
import { test, expect } from '../authFixture';
import { loginAndSaveSession } from "../loginUtils";


// Path to your saved authentication files
const STANDARD_AUTH = 'playwright/.auth/standard-auth.json';

test.describe('TestSuite 01', () => {

    console.log("Code is running before All setup");

    test.beforeAll("Call and Store login", async ({ browser }) => {
        await loginAndSaveSession(STANDARD_AUTH); // Setup login for one time and store it
    });

    test('TestCase01', async ({ page }) => {

        // Assert that the Account selection page is visible
        await page.goto('https://automationexercise.com/');
        const btn_Logout = page.getByText("Logout");
        await expect(btn_Logout).toBeVisible({ timeout: 5000 });

        // Assert that the page title matches the expected title after login
        await expect(page).toHaveTitle("Automation Exercise");
        console.log("Automation Exercise 01")
    });

    test('TestCase02', async ({ page }) => {

        // Assert that the Account selection page is visible
        await page.goto('https://automationexercise.com/');
        const btn_Logout = page.getByText("Logout");
        await expect(btn_Logout).toBeVisible({ timeout: 5000 });

        // Assert that the page title matches the expected title after login
        await expect(page).toHaveTitle("Automation Exercise");
        console.log("Automation Exercise 02")

    })

    test('TestCase03', async ({ page }) => {

        // Assert that the Account selection page is visible
        await page.goto('https://automationexercise.com/');
        const btn_Logout = page.getByText("Logout");
        await expect(btn_Logout).toBeVisible({ timeout: 5000 });

        // Assert that the page title matches the expected title after login
        await expect(page).toHaveTitle("Automation Exercise");
        console.log("Automation Exercise 03")

    })
})

