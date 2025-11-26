import { test } from '../helpers/testSetup';
import { expect } from '@playwright/test';

import { Inventory } from '../pages/productsInventory';

test.describe('Cenário de teste: Inventario de produtos', () => {

    test('Deve adicionar os produtos no carrinho de compra', 
    async ({ loggedInventory }) => {
        
        const inventory: Inventory = loggedInventory.inventoryPage; 
        await test.step('Dado que o usuário acesse e faça login no site Sauce demo', async () => {
        });

        await test.step('Quando o usuário adiciona os três produtos no carrinho', async () => {
            await inventory.adicionarProdutosAoCarrinho();
        });

        await test.step('Então a contagem do carrinho deve ser igual à 3', async () => {
            await expect(inventory.carrinhoIcone).toHaveText('3'); 
        });
    });
    
});