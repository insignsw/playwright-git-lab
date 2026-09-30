import { test, expect } from '../fixtures';
import * as fs from 'fs';
import { LoginPage } from '../pages/LoginPage';


// TASK 1
test('account page is open for logged in user', async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/\/account/);
});


// TASK 2
test.describe('catalog hooks', () => {

  test.beforeAll(() => {
    console.log(`Catalog suite started at ${new Date().toISOString()}`);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await testInfo.attach('failure-screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    }
  });

  test.afterAll(() => {
    console.log(`Catalog suite finished at ${new Date().toISOString()}`);
  });

  test('catalog page is loaded', async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Software Testing/);
  });

});


// TASK 3 
const csv = fs.readFileSync(
  './test-data/login-cases.csv',
  'utf-8'
);

const lines = csv.trim().split(/\r?\n/);
const headers = lines[0].split(',');

const loginCases = lines.slice(1).map((line) => {
const values = line.split(',');

  return {
    name: values[0],
    email: values[1],
    password: values[2],
    expectedResult: values[3],
  };
});


for (const loginCase of loginCases) {

  test(`login - ${loginCase.name}`, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginCase.email,
      loginCase.password
    );

    if (loginCase.expectedResult === 'success') {

      await expect(page).toHaveURL(/\/account/);

    } else {

      await expect(
        page.getByText('Invalid email or password')
      ).toBeVisible();

    }
  });

}