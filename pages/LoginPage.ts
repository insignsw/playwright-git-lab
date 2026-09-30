import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.email = page.getByPlaceholder('Your email');
        this.password = page.getByPlaceholder('Your password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}