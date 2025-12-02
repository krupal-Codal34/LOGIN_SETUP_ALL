import { test } from '../authFixture';

import { expect} from '@playwright/test';
import * as path from 'path';


const STANDARD_AUTH = 'playwright/.auth/standard-auth.json';

test.describe('TestSuite 01',() =>{

    console.log("Code is running Projects for Multiple User Types");

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
});

