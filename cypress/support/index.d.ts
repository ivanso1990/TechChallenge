// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <referencetypes="cypress"/>

declare namespace Cypress {
  interface Chainable {
    sqlServer(config: any): Chainable<Element>;
    tab(moves?: number, shiftKey?: boolean, ctrlKey?: boolean): Chainable<Element>;
    arrow(moves?: number, arrow?: string): Chainable<Element>;
    drag(destiny: string, options: {}): Chainable<Element>;
    fastType(textToType: string): Chainable<Element>;
  }
}

interface String {
  capitalize(): string;
}
