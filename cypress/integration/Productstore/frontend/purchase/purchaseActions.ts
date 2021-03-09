import { goTo } from '~/common/actions/pageActions';
import { timeout } from '~/common/enums/timeouts';

const base = Cypress.env('web_baseUrl');

export function selectCategory(categoryName: string): void {
  cy.url()
    .then((url) => {
      if (!url.includes('index') || url === `${base}/`) {
        goTo('demoblaze');
      }
    })
    .then(() => {
      cy.get('#cat').parent().contains(categoryName).click().wait(timeout.short);
    });
}

export function addToCart(productName: string): void {
  cy.contains('a', productName).then((product) => {
    if (product.is(':visible')) {
      cy.wrap(product)
        .click()
        .wait(timeout.short)
        .then(() => {
          cy.contains('Add to cart')
            .click()
            .wait(timeout.short)
            .then(() => {
              cy.on('window:confirm', () => true);
            });
        });
      return;
    } else {
      cy.get('#next2').then((button) => {
        if (button.is(':visible')) {
          cy.wrap(button).click().wait(timeout.short);
          addToCart(productName);
        }
        return;
      });
    }
  });
}

export function removeFromCart(productName: string): void {
  cy.contains('td', productName).then((product) => {
    if (product.is(':visible')) {
      cy.wrap(product).parents('.success').contains('a', 'Delete').click().wait(timeout.short);
    }
  });
}

export function placeOrder(info: { [x: string]: string }[]): void {
  cy.url()
    .then((url) => {
      if (!url.includes('cart')) {
        goTo('cart');
      }
    })
    .then(() => {
      cy.get('#totalp').as('expectedTotalImport');

      cy.contains('button', 'Place Order')
        .click()
        .wait(timeout.short)
        .then(() => {
          cy.get('#orderModal')
            .should('be.visible')
            .then(() => {
              info.forEach((field) => {
                cy.get(`#${field.name.toLowerCase()}`).then((input) => {
                  if (input.is(':visible')) {
                    cy.wrap(input).type(field.value);
                  }
                });
              });
              cy.contains('button', 'Purchase')
                .click()
                .then(() => {
                  cy.get('.sweet-alert').as('confirmationModal').should('be.visible');
                });
            });
        });
    });
}

export function checkOrder(): void {
  cy.get('@confirmationModal').within(() => {
    cy.contains('h2', 'Thank you for your purchase!').should('be.visible');

    getValueFromConfirmationModal('Id').then((id) => {
      cy.log(`>>> ID: ${id}`);
      console.log(`>>> ID: ${id}`);
    });

    getValueFromConfirmationModal('Amount').then((amount) => {
      cy.log(`>>> Import: ${amount}`);
      console.log(`>>> Import: ${amount}`);
    });
  });
}

export function checkAmount(): void {
  cy.get('@expectedTotalImport').then((totalImport) => {
    const expectedImport = Number(totalImport.text());

    cy.get('@confirmationModal').within(() => {
      getValueFromConfirmationModal('Amount').then((actual) => {
        expect(expectedImport).to.equal(actual);
      });
    });
  });
}

export function acceptOrderModal(): void {
  cy.get('@confirmationModal').within(() => {
    cy.contains('button', 'OK').click();
  });
}

function getValueFromConfirmationModal(filter: string): Cypress.Chainable<number> {
  return cy
    .get('.lead.text-muted')
    .contains(filter)
    .then((child) => {
      const nodes: NodeList = child.prop('childNodes');
      return Array.from(nodes)
        .map((n) => n.textContent)
        .find((n) => n.includes(filter));
    })
    .then((text) => Number(text.split(' ')[1].trim()));
}
