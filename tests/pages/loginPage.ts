import { Page, Locator } from '@playwright/test';
import { SUCCESS_USER, PASSWORD } from '../../src/utils/env-utils';

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(public readonly page: Page) { 
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginSucesso() {
        await this.goto(); 
        
        await this.usernameInput.fill(SUCCESS_USER);
        await this.passwordInput.fill(PASSWORD);
        await this.loginButton.click();
    }
}