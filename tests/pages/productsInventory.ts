import { INVENTORY_DATA } from '../testdata/dataInventory';
import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model para a página de Inventário (Products) do Sauce Demo.
 */
export class Inventory {
    // Locators de Produtos (apenas os nomes, para fins de visualização)
    itemMochila: Locator;
    itemBlusa: Locator;
    itemJaqueta: Locator;
    
    // Locators dos Botões 'Add to Cart'
    btnAddCarrinhoMochila: Locator;
    btnAddCarrinhoBlusa: Locator;
    btnAddCarrinhoJaqueta: Locator;
    
    // Locator do Ícone do Carrinho (Badge)
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

    /**
     * Adiciona e retorna a Mochila ao carrinho de compras.
     */
    async adicionarMochilaAoCarrinho(): Promise<this> {
        await this.btnAddCarrinhoMochila.click();
        return this;
    }

    /**
     * Adiciona e retorna a Blusa ao carrinho de compras.
     */
    async adicionarBlusaAoCarrinho(): Promise<this> {
        await this.btnAddCarrinhoBlusa.click();
        return this;
    }

    /**
     * Adiciona e retonna a Jaqueta ao carrinho de compras.
     */
    async adicionarJaquetaAoCarrinho(): Promise<this> {
        await this.btnAddCarrinhoJaqueta.click();
        return this;
    }

    /**
     * Executa a sequência de adição dos três produtos ao carrinho.
     */
    async adicionarProdutosAoCarrinho(): Promise<this> {
        await this.adicionarMochilaAoCarrinho()
            .then(p => p.adicionarBlusaAoCarrinho())
            .then(p => p.adicionarJaquetaAoCarrinho());
        
        return this;
    }

    async goToCart(): Promise<void> {
        await this.carrinhoIcone.click();
    }
}