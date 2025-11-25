# 🚀 Automated Testings - Sauce Ecomm 🧪

Este repositório contém um **Framework de Automação Híbrido** (UI/API) construído com **Playwright** e **TypeScript**, seguindo o padrão **Page Object Model (POM)** e utilizando a abordagem **BDD-like**.

---

## 🏗️ 1. Arquitetura do Projeto

O projeto é estruturado em três camadas principais para garantir organização e manutenibilidade:

| Pasta | Conteúdo Principal | Padrão | Responsabilidade |
| :--- | :--- | :--- | :--- |
| `tests/specs` | Arquivos `.spec.ts` | **BDD-like (`test.step`)** | Define **O Quê** deve ser testado (fluxo, cenários e asserções). |
| `tests/pages` | Classes `*.ts` | **Page Object Model (POM)** | Define **Como** e **Onde** interagir com a UI (localizadores e métodos de ação). |
| `src/env-utils.ts` | Funções de *Helper* | **Segurança/Utils** | Garante o *setup* seguro do ambiente e valida variáveis críticas. |

---

## 🛠️ 2. Instalação e Configuração

Siga os passos abaixo para clonar o projeto e configurar o ambiente de teste.

### Pré-requisitos
* Node.js (versão 18 ou superior)
* NPM (gerenciador de pacotes)

### Passo a Passo

#### 2.1. Clone o Repositório

```
git clone [https://github.com/claudianalima/automated-testings-sauce-ecomm.git]
cd automated-testings-sauce-ecomm
```

### 2.2. Instale as Dependências
Instala o Playwright, TypeScript e o dotenv para leitura de variáveis de ambiente.

```
npm install
```

### 2.3. Configuração de Variáveis de Ambiente (.env)
Para manter as credenciais seguras, crie um arquivo chamado .env na raiz do projeto e insira as credenciais de teste do Sauce Demo:

### .env (ESTE ARQUIVO É IGNORADO PELO GITIGNORE)
```
SAUCE_USER=
SAUCE_PASSWORD=
```
Utilize os usuários e password do site SauceDemo

### 2.4. Instale os Browsers
O Playwright usará esta linha para garantir que os binários do Chromium, Firefox e WebKit estejam instalados no seu ambiente.

```
npx playwright install
```

## 🧪 3. Execução dos Testes
Execução de Todos os Testes

```
npx playwright test
```

Execução de um Arquivo Específico
Para rodar apenas o teste de login:

```
npx playwright test tests/specs/login.spec.ts
```

Abrir o Relatório HTML
Após a execução, você pode visualizar os resultados detalhados (incluindo os passos BDD-like):

```
npx playwright show-report
```

## 📝 4. Exemplo de Teste (BDD-like)
O padrão BDD-like usa a função test.step() do Playwright para aumentar a legibilidade e clareza nos logs de report. Note que a lógica de interação (preencher, clicar) é totalmente encapsulada pelo Page Object (loginPage).

Arquivo: tests/specs/login.spec.ts

```
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Importa o POM

test.describe('Feature: Autenticação de Usuário no Sauce Demo', () => {

    let loginPage: LoginPage; 
    
    test.beforeEach(async ({ page }) => {
        // Inicializa o Page Object antes de cada cenário
        loginPage = new LoginPage(page);
    });

    test('Scenario: Login de usuário padrão com sucesso', async ({ page }) => {
        
        // --- GIVEN (Dado que) ---
        await test.step('Dado que o usuário está na página de login', async () => {
            await loginPage.goto(); 
        });

        // --- WHEN (Quando) ---
        await test.step('Quando o usuário realiza o login com sucesso', async () => {
            // Chamada ao POM (abstração total da interação)
            await loginPage.loginSuccessfully();
        });

        // --- THEN (Então) ---
        await test.step('Então o usuário deve ser redirecionado para a página de inventário', async () => {
            // Asserções limpas e focadas no resultado do negócio
            await expect(page).toHaveURL(/inventory.html/); 
            await expect(page.getByText('Products')).toBeVisible(); 
        });
    });
});
```
