// Importa o 'test' customizado que contém o novo fixture
import { expect } from '@playwright/test';
import { test } from '../helpers/testSetup';

test.describe('Feature: Autenticação de Usuário no Sauce Demo', () => {

    // Usa o novo fixture 'loginPageOnly'
    test('CT-1: Login de usuário padrão com sucesso', async ({ loginPageOnly }) => {
        
        // 1. DADO QUE: A LoginPage está pronta
        await test.step('Dado que o usuário acesse o Sauce Demo', async () => {
            // A LoginPage é injetada
            await loginPageOnly.goto(); 
        });

        // 2. QUANDO
        await test.step('Quando o usuário insere credenciais válidas e clica em Login', async () => {
            await loginPageOnly.loginSucesso();
        });

        // 3. ENTÃO
        await test.step('Então o usuário deve ser redirecionado para a página principal', async () => {
            // Acesso ao objeto 'page' via o objeto injetado (ou pedindo 'page' no argumento)
            // Se você precisar do 'page' para a URL, peça-o no argumento do teste:
            // async ({ loginPageOnly, page }) => { ... }
            
            // Supondo que você pediu 'page' no argumento:
            const page = loginPageOnly.page; 

            await expect(page).toHaveURL(/inventory.html/); 
            await expect(page.getByText('Products')).toBeVisible(); 
        });
    });
});