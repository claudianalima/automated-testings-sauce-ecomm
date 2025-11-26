import { test as baseTest, Page } from '@playwright/test';
import * as playwright from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Inventory } from '../pages/productsInventory';

interface Pages {
    loginPage: LoginPage;
    inventoryPage: Inventory;
}

type MyFixtures = {
    loggedInventory: Pages; 
    loginPageOnly: LoginPage; 
};


async function setupLoggedInState(page: Page): Promise<Pages> {
    const loginPage = new LoginPage(page);
    const inventoryPage = new Inventory(page);
    
    await loginPage.loginSucesso();
    await playwright.expect(page).toHaveURL(/inventory\.html/); 

    return { loginPage, inventoryPage };
}


export const test = baseTest.extend<MyFixtures>({
    
    // 1. ADICIONAR DE VOLTA O FIXTURE DE INVENTÁRIO (O QUE ESTAVA FALTANDO)
    loggedInventory: [
        async ({ page }, use) => {
            const pages = await setupLoggedInState(page);
            await use(pages); 
        },
        { scope: 'test' }
    ],
    
    // 2. MANTER O FIXTURE DE LOGIN (QUE VOCÊ ADICIONOU)
    loginPageOnly: [
        async ({ page }, use) => {
            const loginPage = new LoginPage(page);
            await use(loginPage); 
        },
        { scope: 'test' }
    ]
});