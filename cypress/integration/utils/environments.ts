const env: string = !!Cypress.env('Environment') ? Cypress.env('Environment') : 'qap';
export const environment = Cypress.env(env);
