import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginCases from '../test-data/login.json';

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