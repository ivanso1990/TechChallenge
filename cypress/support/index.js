// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
require('cypress-xpath');
import '@shelex/cypress-allure-plugin';
import sqlServer from 'cypress-sql-server';
import './commands';

sqlServer.loadDBCommands();

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.Commands.add('tab', (moves = 1, ctrlKey = false) => {
  for (let m = 0; m < Math.abs(moves); ++m) {
    cy.focused()
      .trigger('keydown', {
        keyCode: 9,
        which: 9,
        shiftKey: moves < 0,
        ctrlKey: ctrlKey,
      })
      .focused();
  }
});

Cypress.Commands.add('arrow', (moves = 1, arrow = 'left') => {
  let arrowType;
  switch (arrow) {
    case 'left':
      arrowType = '{leftarrow}';
      break;
    case 'right':
      arrowType = '{rightarrow}';
      break;
    case 'up':
      arrowType = '{uparrow}';
      break;
    case 'down':
      arrowType = '{downarrow}';
      break;
  }
  for (let m = 0; m < Math.abs(moves); ++m) {
    cy.focused().type(arrowType).focused();
  }
});

Cypress.Commands.add('fastType', { prevSubject: true }, (subject, textToType) => {
  cy.wrap(subject)
    .clear({ force: true })
    .then((element) => {
      element.val(textToType);
    })
    .type(' ', { parseSpecialCharSequences: false });
});
