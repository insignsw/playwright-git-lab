import {test, expect} from '@playwright/test';

test('Test 1 - search for pliers', async ({page}) => {

    await page.goto('https://practicesoftwaretesting.com/');
    const searchBox = page.getByRole('textbox', {name : 'Search'});
    
    await searchBox.dblclick();
    await searchBox.fill('Pliers');
    await expect(searchBox).toHaveValue('Pliers');

    await page.getByRole('button', { name: 'Search' }).click();

    const productTitles = page.locator('.card-title');
    await expect(productTitles).toHaveCount(4);

});

test('Test 2 - filter catalog to hammers', async ({ page }) => {

    await page.goto('https://practicesoftwaretesting.com/');
    const hammerCheckBox = page.getByRole('checkbox', {name : 'Hammer'});
    await hammerCheckBox.check();
    await expect(hammerCheckBox).toBeChecked();

    const productTitles = page.locator('.card-title');
    await expect(productTitles).toHaveCount(7);

    await hammerCheckBox.uncheck();
    await expect(hammerCheckBox).not.toBeChecked();
});

test('Test 3 - sort products by name', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const sortDropdown = page.getByRole('combobox', { name: 'Sort' });
    await sortDropdown.selectOption({ label: 'Name (A - Z)' });

    const productTitles = page.locator('.card-title');
    await expect(productTitles).toHaveCount(9);

    await expect(productTitles.first()).toContainText('Adjustable Wrench');
    await expect(productTitles.first()).toHaveClass('card-title');
});

test('Test 4 - inspect product and add two items to cart', async ({ page }) => {

    await page.goto('https://practicesoftwaretesting.com/');
    const product = page.getByText('Combination Pliers', { exact: true });
    await product.hover();
    await product.click();

    await expect(
        page.getByRole('heading', { name: 'Combination Pliers', level: 1 })
    ).toBeVisible();

    const quantity = page.getByRole('spinbutton', { name: 'Quantity' });
    await expect(quantity).toHaveValue('1');

    const increaseButton = page.getByRole('button', { name: 'Increase quantity' });
    await increaseButton.click();
    await expect(quantity).toHaveValue('2');

    await page.getByRole('button', { name: 'Add to cart' }).click();
    const alert = page.getByRole('alert');
    await expect(alert).toContainText('Product added to shopping cart');

    const cart = page.locator('[data-test="nav-cart"]');
    await expect(cart).toBeVisible();
    await expect(cart).toContainText('2');
});