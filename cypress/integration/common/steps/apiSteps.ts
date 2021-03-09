import { Given } from 'cypress-cucumber-preprocessor/steps';
import { StatusCodes } from '../enums/statusCodes';

Given('the api is running', () => {
  const apiUrl: string = Cypress.env('api_baseEndpoint');
  cy.log('Checking if the API is up and running');
  cy.request({
    method: 'GET',
    url: apiUrl.replace('/v2', ''),
  }).then((response: Cypress.Response) => {
    expect(response.status).to.equal(StatusCodes.success);
  });
});
