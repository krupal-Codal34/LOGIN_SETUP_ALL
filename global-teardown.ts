import type { FullConfig } from '@playwright/test';

export default async function globalTeardown(_config?: FullConfig) {
  // Global teardown logic: cleanup or final logging.
  // Keep this minimal; avoid calling `test()` or other test-entry APIs here.
  // eslint-disable-next-line no-console
  console.log('Test Execution has been completed...');
}
