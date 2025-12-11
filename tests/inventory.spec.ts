// src/tests/inventory.test.ts (ou similar)

import { test } from '../src/helpers/testSetup'; // Assumindo que este é o caminho correto
import { expect } from '@playwright/test';

test.describe('Inventário de produtos do site ecomm', () => {
    
    test('Deve adicionar os produtos no carrinho de compra', 
    async ({ inventoryPage, loggedUser }) => { 
        await test.step('Dado que o usuário está logado e na página de Inventário', async () => {
        });

        await test.step('Quando o usuário adiciona os três produtos no carrinho', async () => {
            await inventoryPage.adicionarProdutosAoCarrinho();
        });

        await test.step('Então a contagem do carrinho deve ser igual à 3', async () => {
            await expect(inventoryPage.carrinhoIcone).toHaveText('3'); 
        });
    });
});