import { test as baseTest, Page, expect } from '@playwright/test';
import { LoginPage } from '../../tests/pages/loginPage';
import { Inventory } from '../../src/pages/productsInventory';
import { INVENTORY_DATA } from '../../tests/testdata/dataInventory';
import { URL_BASE } from '../utils/env-utils';

type MyFixtures = {
    loginPageOnly: LoginPage; 
    inventoryPage: Inventory;
    
    loggedUser: Page;
};

export const test = baseTest.extend<MyFixtures>({
    
    loginPageOnly: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage); 
    },
    
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new Inventory(page);
        await use(inventoryPage); 
    },

    loggedUser: async ({ page, loginPageOnly }, use) => {
        await loginPageOnly.loginSucesso();
        
        const fullInventoryUrl = `${URL_BASE}${INVENTORY_DATA.URL_INVENTARIO_PRODUTOS}`;
        await expect(page).toHaveURL(fullInventoryUrl); 
        
        await use(page); 
    },
});