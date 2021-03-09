/// <reference types="cypress" />

const baseEndpoint: string = Cypress.env('api_baseEndpoint');

export function apiGet(enpoint: string, qs: any = null): Cypress.Chainable<Cypress.Response> {
  if (qs === null) {
    return cy.request({
      method: 'GET',
      url: baseEndpoint + enpoint,
      failOnStatusCode: false,
    });
  }

  return cy.request({
    method: 'GET',
    url: baseEndpoint + enpoint,
    failOnStatusCode: false,
    qs: qs,
  });
}

export function apiPost(endpoint: string, mockEntity: any): Cypress.Chainable<Cypress.Response> {
  return cy.request({
    method: 'POST',
    url: baseEndpoint + endpoint,
    failOnStatusCode: false,
    body: mockEntity,
  });
}

export function apiPut(endpoint: string, mockEntity: any): Cypress.Chainable<Cypress.Response> {
  return cy.request({
    method: 'PUT',
    url: baseEndpoint + endpoint,
    failOnStatusCode: false,
    body: mockEntity,
  });
}

export function apiDelete(endpoint: string): Cypress.Chainable<Cypress.Response> {
  return cy.request({
    method: 'DELETE',
    url: baseEndpoint + endpoint,
    failOnStatusCode: false,
  });
}
