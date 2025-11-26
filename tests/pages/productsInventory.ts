import { INVENTORY_DATA } from '../testdata/dataInventory';
import { Page, Locator } from '@playwright/test'; 

export class Inventory {
    itemMochila: Locator;
    itemBlusa: Locator;
    itemJaqueta: Locator;
    btnAddCarrinhoMochila: Locator;
    btnAddCarrinhoBlusa: Locator;
    btnAddCarrinhoJaqueta: Locator;
    carrinhoIcone: Locator;

    constructor(public readonly page: Page) { 

        
        this.itemMochila = this.page.getByText(INVENTORY_DATA.NOME_PRODUTO_MOCHILA); 
        this.btnAddCarrinhoMochila = this.page.locator(INVENTORY_DATA.ID_CARRINHO_PRODUTO_MOCHILA);

        this.itemBlusa = this.page.getByText(INVENTORY_DATA.NOME_PRODUTO_BLUSA);
        this.btnAddCarrinhoBlusa = this.page.locator(INVENTORY_DATA.ID_CARRINHO_PRODUTO_BLUSA);
        
        this.itemJaqueta = this.page.getByText(INVENTORY_DATA.NOME_PRODUTO_JAQUETA);
        this.btnAddCarrinhoJaqueta = this.page.locator(INVENTORY_DATA.ID_CARRINHO_PRODUTO_JAQUETA)
        
        this.carrinhoIcone = this.page.locator('.shopping_cart_badge'); 
    }

    async adicionarProdutosAoCarrinho() {
        await this.btnAddCarrinhoMochila.click();
        await this.btnAddCarrinhoBlusa.click();
        await this.btnAddCarrinhoJaqueta.click();
    }
}