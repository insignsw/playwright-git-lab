import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cart: Locator;
    readonly sortDropdown: Locator;
    readonly productLinks: Locator;
    readonly prices: Locator;
    readonly homeLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cart = page.locator('[data-test="nav-cart"]');
        this.sortDropdown = page.getByRole('combobox', { name: 'Sort' });
        this.productLinks = page.locator('[data-test="product-name"]');
        this.prices = page.locator('.card-text');
        this.homeLink = page.locator('a.navbar-brand[title="Practice Software Testing - Toolshop"]');
    }

    async goto(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }

    async addItemToCart(productName: string) {
        await this.productLinks
            .getByText(productName, { exact: true })
            .click();

        await this.page.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeItemFromCart(productName: string) {
        await this.cart.click();

        const productTitle = this.page
            .locator('[data-test="product-title"]')
            .getByText(productName, { exact: true });

        const productRow = productTitle.locator('xpath=ancestor::tr');

        await productRow.locator('a.btn.btn-danger').click();
    }
}