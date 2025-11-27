import { test as baseTest, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { INVENTORY_DATA } from '../testdata/dataInventory';
import { URL_BASE } from '../../src/utils/env-utils';

type MyFixtures = {
    loginPageOnly: LoginPage; 
    loggedUser: Page;
    loggedUserIvalid: Page; 
};

export const test = baseTest.extend<MyFixtures>({
    
    loginPageOnly: [
        async ({ page }, use) => {
            const loginPage = new LoginPage(page);
            await use(loginPage); 
        },
        { scope: 'test' }
    ],

    loggedUser: [
        async ({ page, loginPageOnly }, use) => {
            
            await loginPageOnly.goto(); 
            await loginPageOnly.loginSucesso();

            const fullInventoryUrl = `${URL_BASE}${INVENTORY_DATA.URL_INVENTARIO_PRODUTOS}`;

            await expect(loginPageOnly.page).toHaveURL(fullInventoryUrl); 

            await use(page); 
        },
        { scope: 'test' }
    ]
});