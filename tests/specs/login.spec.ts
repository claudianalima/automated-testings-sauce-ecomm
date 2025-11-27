import { expect } from '@playwright/test';
import { test } from '../helpers/testSetup';
import { SAUCE_LOCKED_USER ,PASSWORD } from '../../src/utils/env-utils';

test.describe('Autenticação de Usuário no Sauce Demo', () => {

    test('CT-001: Login de usuário padrão com sucesso', async ({ loginPageOnly }) => {
        
        await test.step('Dado que o usuário acesse o Sauce Demo', async () => {
            await loginPageOnly.goto(); 
        });

        await test.step('Quando o usuário insere credenciais válidas e clica em Login', async () => {
            await loginPageOnly.loginSucesso();
        });

        await test.step('Então o usuário deve ser redirecionado para a página principal', async () => {
            
            const page = loginPageOnly.page; 
            
            await expect(page.getByText('Products')).toBeVisible(); 

        });
    });

    test('CT-002: Login com usuário bloqueado', async ({ loginPageOnly }) => {
        
        await test.step('Dado que o usuário está na página de Login', async () => {
            await loginPageOnly.goto(); 
        });
        
        await test.step('Quando o usuário insere credenciais de usuário bloqueado', async () => {
            await loginPageOnly.login(SAUCE_LOCKED_USER, PASSWORD);
        });

        await test.step('Então uma mensagem de erro indicando o bloqueio deve ser exibida', async () => {
            const errorMessageLocator = loginPageOnly.getErrorMessage();
            
            await expect(errorMessageLocator).toBeVisible();
            await expect(errorMessageLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        });
    });
    
    
    test('CT-003: Login com senha inválida', async ({ loginPageOnly }) => {
        
        await test.step('Dado que o usuário está na página de Login', async () => {
            await loginPageOnly.goto(); 
        });
        
        await test.step('Quando o usuário insere uma senha inválida para um usuário padrão', async () => {
            await loginPageOnly.login(SAUCE_LOCKED_USER, 'senha_errada');
        });

        await test.step('Então uma mensagem de erro de credenciais inválidas deve ser exibida', async () => {
            const errorMessageLocator = loginPageOnly.getErrorMessage();
            
            await expect(errorMessageLocator).toBeVisible();
            await expect(errorMessageLocator).toHaveText('Epic sadface: Username and password do not match any user in this service');
        });
    });

});