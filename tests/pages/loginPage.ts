import { Page, Locator } from '@playwright/test';
import { SUCCESS_USER, PASSWORD, URL_BASE } from '../../src/utils/env-utils';

/**
 * Page Object Model para a tela de Login do Sauce Demo.
 * * Este possui o método 'login(username, password)' parametrizado,
 * que é reutilizável para todos os cenários (sucesso, falha, bloqueio).
 * Mantém 'loginSucesso()' como um wrapper para testes que logam com um username fixo.
 */
export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator; 

    constructor(public readonly page: Page) { 
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.locator('[data-test="error"]');
    }

    async goto(): Promise<this> {
        await this.page.goto(URL_BASE);
        return this;
    }

    async fillUsername(username: string): Promise<this> {
        await this.usernameInput.fill(username);
        return this;
    }

    async fillPassword(password: string): Promise<this> {
        await this.passwordInput.fill(password);
        return this;
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }
    
    getErrorMessage(): Locator {
        return this.errorMessage;
    }

    async login(username: string, password: string): Promise<void> {
        await this.goto()
            .then(page => page.fillUsername(username))
            .then(page => page.fillPassword(password))
            .then(page => page.clickLogin());
    }
    
    async loginSucesso(): Promise<void> {
        await this.login(SUCCESS_USER, PASSWORD);
    }
}