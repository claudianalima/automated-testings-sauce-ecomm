const getEnvVar = (name: string): string => {
    const value = process.env[name];
    
    if (value === undefined || value === null) {
        // Lança um erro útil se a variável não estiver no .env
        throw new Error(`
            Variável de ambiente '${name}' não está definida.
            Verifique se o '.env' foi carregado (playwright.config.ts) e se '${name}' está presente.
        `);
    }
    return value;
};

export const SUCCESS_USER = getEnvVar('SAUCE_USER');
export const PASSWORD = getEnvVar('SAUCE_PASSWORD');