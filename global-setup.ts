import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const projectUse = config.projects?.[0]?.use;
  const baseURL = projectUse?.baseURL as string | undefined;
  const storageState = projectUse?.storageState as string | undefined;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  if (baseURL) {
    await page.goto(baseURL);
  }

  // Only attempt login if the page has the expected login link
  try {
    await page.locator("[href='/login']").click();
    // Perform Login
    await page.getByRole('textbox', { name: 'email' }).first().fill('Test22092024@198.com');
    await page.getByRole('textbox', { name: 'password' }).fill('Test22092024@198');
    await page.getByRole('button', { name: 'Login' }).click();

    if (storageState) {
      await page.context().storageState({ path: storageState });
    }
  } catch (e) {
    // If login flow isn't present, just continue and close the browser.
    // This prevents setup from failing if baseURL or selectors change.
    // eslint-disable-next-line no-console
    console.warn('global-setup: login flow skipped or failed:', (e as Error).message);
  }

  await browser.close();
}

export default globalSetup;
