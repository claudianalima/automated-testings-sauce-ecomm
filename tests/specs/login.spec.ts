import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage'; 

test.describe('Feature: Autenticação de Usuário no Sauce Demo', () => {

    let loginPage: LoginPage; 
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('Scenario: Login de usuário padrão com sucesso', async ({ page }) => {
        
        await test.step('Given o usuário está na página de login do Sauce Demo', async () => {
            await loginPage.goto(); 
        });

        await test.step('When o usuário insere credenciais válidas e clica em Login', async () => {
            await loginPage.loginSuccessfully();
        });

        await test.step('Then o usuário deve ser redirecionado para a página de inventário e o título "Products" deve ser visível', async () => {
            await expect(page).toHaveURL(/inventory.html/); 

            await expect(page.getByText('Products')).toBeVisible(); 
        });
    });

});