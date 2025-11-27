import { test } from '../helpers/testSetup';
import { expect } from '@playwright/test';
import { Inventory } from '../pages/productsInventory';

test.describe('Inventário de produtos do site ecomm', () => {

    test('Deve contabilizar os produtos adicionados no carrinho de compra do usuário logado', 
    async ({ loggedUser }) => {
        let inventory: Inventory;

        await test.step('Dado que o usuário está logado e na página de Inventário', async () => {
            inventory = new Inventory(loggedUser);
        });

        await test.step('Quando o usuário adiciona os três produtos no carrinho', async () => {
            await inventory.adicionarProdutosAoCarrinho();
        });

        await test.step('Então a contagem do carrinho deve ser igual à 3', async () => {
            await expect(inventory.carrinhoIcone).toHaveText('3'); 
        });
    });
    
});