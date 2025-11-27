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
export const URL_BASE = getEnvVar('SAUCE_URL_BASE');
export const SAUCE_LOCKED_USER = getEnvVar('SAUCE_LOCKED_USER');
export const SAUCE_PROBLEM_USER= getEnvVar('SAUCE_PROBLEM_USER');
export const SAUCE_ERROR_USER = getEnvVar('SAUCE_ERROR_USER'); 
export const SAUCE_INVALID_USER = getEnvVar('SAUCE_INVALID_USER');