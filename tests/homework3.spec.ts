import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

const CUSTOMER_EMAIL = 'customer@practicesoftwaretesting.com';
const CUSTOMER_PASSWORD = 'welcome01';

test('Add two items to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(CUSTOMER_EMAIL, CUSTOMER_PASSWORD);

    await homePage.goto();
    await homePage.addItemToCart('Combination Pliers');
    await expect(homePage.cart).toContainText('1');

    await homePage.goto();
    await homePage.addItemToCart('Bolt Cutters');
    await expect(homePage.cart).toContainText('2');
});

test('Remove one item from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(CUSTOMER_EMAIL, CUSTOMER_PASSWORD);

    await homePage.goto();
    await homePage.addItemToCart('Combination Pliers');
    await expect(homePage.cart).toContainText('1');

    await homePage.goto();
    await homePage.addItemToCart('Pliers');
    await expect(homePage.cart).toContainText('2');

    await homePage.removeItemFromCart('Pliers');

    await expect(homePage.cart).toContainText('1');
});