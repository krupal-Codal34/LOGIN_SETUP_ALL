import { test as base, expect } from "@playwright/test";

type MyFixture = {
    loggedInUser: string;
};

const test = base.extend<MyFixture>({
    loggedInUser: [
        async ({ page }, use) => {
            const baseURL = "https://automationexercise.com";

            console.log("--- Starting Login Fixture Setup ---");

            await page.goto(baseURL);

            await page.locator("[href='/login']").click();
            // Perform Login
            await page
                .getByRole("textbox", { name: "email" })
                .first()
                .fill("Test22092024@198.com");
            await page
                .getByRole("textbox", { name: "password" })
                .fill("Test22092024@198");
            await page.getByRole("button", { name: "Login" }).click();

            const username = "testuser"; // The value you want to provide
            await use(username);
            console.log(
                `--- Ending Login Fixture Teardown for user: ${username} ---`
            );
        },
        {
            // Specify the scope: 'test' means it runs once per test function.
            // 'page' is also common and runs once per page instance.
            scope: "test",
            // 'auto: true' would make it run for every test in the file, even if not requested.
            // We leave it as default (false) so it only runs when requested.
        },
    ],
});

test.describe('Stored logged using inbuilt fixture on the file', () => {

    console.log("Code is running inbuilt fixture setup in functional spec file");

    test("TestCase01", async ({ loggedInUser, page }) => {
        //   const page = await webContext.newPage();
        console.log(`Test running as user: ${loggedInUser}`);
        await page.goto("https://automationexercise.com/");
        const btn_Logout = page.getByText("Logout");
        await expect(btn_Logout).toBeVisible({ timeout: 5000 });

        // Assert that the page title matches the expected title after login
        await expect(page).toHaveTitle("Automation Exercise");
        console.log("Automation Exercise 01");
    });

    test("TestCase02", async ({ loggedInUser,page }) => {
        //   const page = await webContext.newPage();
        console.log(`Test running as user: ${loggedInUser}`);
        await page.goto("https://automationexercise.com/");
        const btn_Logout = page.getByText("Logout");
        await expect(btn_Logout).toBeVisible({ timeout: 5000 });

        // Assert that the page title matches the expected title after login
        await expect(page).toHaveTitle("Automation Exercise");
        console.log("Automation Exercise 02");
    });
})