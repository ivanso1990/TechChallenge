import { timeout } from '../enums/timeouts';

const base = Cypress.env('web_baseUrl');

export function goTo(name: string): void {
  let url: string;
  switch (name) {
    case 'demoblaze':
      url = base;
      break;
    default:
      url = `${base}/${name.toLowerCase()}.html`;
      break;
  }
  cy.visit(url).wait(timeout.short);
}
