# Playwright Login Strategies

This project demonstrates various strategies for handling user authentication and sessions in Playwright tests. It provides examples of different approaches to logging in, from global setup to custom fixtures, allowing you to choose the best method for your testing needs.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v18 or higher is recommended)
- [npm](https://www.npmjs.com/) (which comes with Node.js)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd LOGIN_SETUP_ALL
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```
4. **Environment Variables**
   This project uses `dotenv` to manage environment variables. Create a `.env` file in the root of the project and add the necessary variables. For example:
   ```
   BASE_URL=https://automationexercise.com/
   ```

## Login Strategies

This project showcases several different ways to handle logins in Playwright:

### 1. Global Setup (`global-setup.ts`)

This method uses a global setup file to authenticate a user once before any tests are run. The authentication state (like cookies and local storage) is then saved to a file and reused by the tests.

-   **Relevant Files:** `global-setup.ts`, `playwright.config.ts` (see `globalSetup` and `projects` using `storageState`), `tests/Global.spec.ts`
-   **How it works:** The `globalSetup` function in `playwright.config.ts` points to `global-setup.ts`. This script launches a browser, performs the login, and saves the context's storage state to a JSON file (e.g., `playwright/.auth/admin-auth.json`). The projects in `playwright.config.ts` are then configured to use this `storageState` for all tests.
-   **Run the tests:**
    ```bash
    npm run test_SGlobal
    npm run test_AGlobal
    ```

### 2. Project-Based Authentication

This approach uses Playwright's "projects" feature to run the same test file with different authentication setups for different user roles (e.g., 'admin' and 'standard user'). A custom fixture is used to handle the login for each role.

-   **Relevant Files:** `playwright.config.ts` (see `projects` with `userRole`), `authFixture.ts`, `tests/ProjectWay.spec.ts`
-   **How it works:** The `playwright.config.ts` file defines different projects, each with a specific `userRole` in its `use` options. The `authFixture.ts` file defines a test fixture that performs a login based on this `userRole` before each test run.
-   **Run the tests:**
    ```bash
    npm run test_Standard
    npm run test_Admin
    ```

### 3. Test-Level Fixture

This method defines a fixture directly within the test file. The fixture is responsible for logging in the user, and tests can then use this fixture to run in an authenticated state.

-   **Relevant Files:** `tests/login.spec.ts`
-   **How it works:** The test file extends the base `test` object from Playwright to create a new `loggedInUser` fixture. This fixture contains the logic to navigate to the login page, fill in credentials, and log in. Tests that need to be authenticated can then request this fixture.
-   **Run the tests:**
    ```bash
    npm run test_SLogin
    npm run test_ALogin
    ```

### 4. Custom Fixture (`fixtures.ts`)

This is similar to the project-based approach but uses a more generic custom fixture defined in a separate file.

-   **Relevant Files:** `fixtures.ts`, `tests/CustomFixtureLogin.spec.ts`
-   **How it works:** The `fixtures.ts` file defines a custom test fixture that handles the login process. Test files can then import this custom `test` object instead of the one from `@playwright/test`.
-   **Run the tests:**
    ```bash
    npm run test_SCustomLogin
    npm run test_ACustomLogin
    ```

### 5. `beforeAll` Hook

This method uses a `beforeAll` hook within a test suite to run a login function once before all the tests in that suite are executed.

-   **Relevant Files:** `loginUtils.ts`, `tests/Way1example.spec.ts`
-   **How it works:** A `beforeAll` block at the top of the test suite calls a helper function (`loginAndSaveSession` from `loginUtils.ts`) that performs the login and saves the session state.
-   **Run the test:**
    ```bash
    npm run test_way1
    ```

### 6. Pre-Test Script

This method involves running a separate script to perform the login *before* running the Playwright test command.

-   **Relevant Files:** `loginUtils.ts`, `loginUtils.js`, `tests/Way2example.spec.ts`, `package.json` (see `test_way2` script)
-   **How it works:** The `test_way2` script in `package.json` first compiles `loginUtils.ts` to JavaScript, then executes the resulting `loginUtils.js` file (which performs the login and saves the state), and finally runs the Playwright tests.
-   **Run the test:**
    ```bash
    npm run test_way2
    ```

## Running Tests

You can run the tests for each strategy using the npm scripts defined in `package.json`:

```bash
# Run tests for Global Setup
npm run test_SGlobal
npm run test_AGlobal

# Run tests for Project-Based Authentication
npm run test_Standard
npm run test_Admin

# Run tests for Test-Level Fixture
npm run test_SLogin
npm run test_ALogin

# Run tests for Custom Fixture
npm run test_SCustomLogin
npm run test_ACustomLogin

# Run tests for beforeAll Hook
npm run test_way1

# Run tests for Pre-Test Script
npm run test_way2
```

## Test Reports

After running the tests, a detailed HTML report will be generated in the `playwright-report` directory. You can view the report by opening the `index.html` file in your browser:

```bash
npx playwright show-report
```
