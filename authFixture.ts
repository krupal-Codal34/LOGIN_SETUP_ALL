// tests/authFixture.ts
import { test as base, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { loginAndSaveSession } from './loginUtils';

// 1. Define Paths and Types
type UserRole = 'standard' | 'admin';

const authFilePaths: Record<UserRole, string> = {
    // Note: Using path.resolve to ensure the path is absolute from the project root
    standard: path.resolve('playwright', '.auth', 'standard-auth.json'),
    admin: path.resolve('playwright', '.auth', 'admin-auth.json'),
};

export type CustomFixtures = {
    userRole: UserRole;             // Parameter: Set by playwright.config.ts
    page: Page;                     // Override default 'page' with the authenticated one
};

// 2. Extend the base test object
export const test = base.extend<CustomFixtures>({

    // --- User Role Parameter ---
    // Sets the default role, but is overridden by playwright.config.ts
    userRole: ['standard', { option: true }],

    // --- Override the 'context' fixture (runs once per test worker/process) ---
    context: async ({ browser, userRole }, use) => {
        const authFilePath = authFilePaths[userRole];

        // 🔑 The 'beforeAll' Logic: Conditional Login
        if (!fs.existsSync(authFilePath)) {
            console.log(`[AUTH SETUP] Auth file for ${userRole} not found. Running one-time login...`);
            await loginAndSaveSession(userRole, authFilePath);
        }

        // Create a new browser context that loads the stored session state
        const context = await browser.newContext({
            storageState: authFilePath
        });

        await use(context);
        await context.close();
    },

    // --- Override the 'page' fixture ---
    // Every test requesting 'page' will now receive this authenticated version.
    page: [async ({ context }, use) => {
        const page = await context.newPage();

        // Optional: Perform a quick check here if needed (e.g., go to base URL)
        // await page.goto('/'); 

        await use(page);
        // Cleanup: page close happens after the test finishes
    }, { scope: 'test' }],
});

export const expect = test.expect;