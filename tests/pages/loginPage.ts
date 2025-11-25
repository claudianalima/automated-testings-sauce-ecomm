import { Page, Locator } from '@playwright/test';
import { SUCCESS_USER, PASSWORD } from '../../src/utils/env-utils';

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly url: string = 'https://www.saucedemo.com/';

    constructor(private readonly page: Page) { 
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async loginSuccessfully() {
        await this.usernameInput.fill(SUCCESS_USER);
        await this.passwordInput.fill(PASSWORD);
        await this.loginButton.click();
    }
}