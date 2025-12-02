// playwright/fixtures.ts
import { test as baseTest, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Re-export Playwright's default functions for convenience
export * from '@playwright/test';

// 1. Extend the base test object.
// The second generic parameter defines a worker-scoped fixture named 'workerStorageState'
// which will pass the file path (a string) to the fixture that overrides the built-in 'storageState'.
export const test = baseTest.extend<{}, { workerStorageState: string }>({

    // 2. Override the built-in 'storageState' option (context-scoped)
    // This fixture simply receives the path from the worker-scoped one and passes it to the test context.
    storageState: ({ workerStorageState }, use) => {
        // 'workerStorageState' holds the path to the auth file
        return use(workerStorageState);
    },

    // 3. Define the Worker-Scoped Authentication Logic (The Global beforeAll)
    workerStorageState: [async ({ browser }, use) => {
        // Use parallelIndex as a unique identifier for each worker.
        // This ensures each parallel worker has its own independent login session.
        const workerIndex = test.info().parallelIndex;

        // Define the unique file name for this worker
        const fileName = path.resolve(
            test.info().project.outputDir,
            `.auth/worker-${workerIndex}.json` // e.g., 'test-results/.auth/worker-0.json'
        );

        // Check if the auth state file already exists
        if (fs.existsSync(fileName)) {
            console.log(`Worker ${workerIndex}: Reusing existing login state from ${fileName}`);
            await use(fileName); // Pass the existing file path to the storageState fixture
            return;
        }

        console.log(`Worker ${workerIndex}: Performing one-time login...`);

        // IMPORTANT: Authenticate in a clean environment by unsetting storage state.
        // This ensures the login is not affected by any previous runs.
        const page = await browser.newPage();

        console.log("--- Starting Login Fixture Setup ---");
        const baseURL = "https://automationexercise.com";
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

        // const username = "testuser"; // The value you want to provide
        // await use(username);
        console.log(
            // `--- Ending Login Fixture Teardown for user: ${username} ---`
        );

        // Save the authentication state (cookies and local/session storage) to the unique file
        await page.context().storageState({ path: fileName });
        console.log(`Worker ${workerIndex}: Login state saved to ${fileName}`);

        // Close the temporary page used for login
        await page.close();

        // Pass the new file path to the actual tests
        await use(fileName);

        // 4. Fixture Teardown (Optional: Global afterAll)
        // This code runs AFTER all tests in the worker are finished.
        // Example: Clean up the file or database records.
        // fs.unlinkSync(fileName); 
        // console.log(`Worker ${workerIndex}: Deleted login state file.`);

    }, {
        scope: 'worker', // Runs once per worker process (i.e., once for a set of parallel tests)
        auto: true,      // Automatically executes this fixture for every test
    }],
});