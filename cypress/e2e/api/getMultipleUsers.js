import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

export let response;
export const url = Cypress.config('baseUrl'); // or use Cypress.env('baseUrl')

Given('I have the {string} endpoint', (endpoint) => {
  cy.wrap(url + endpoint).as('url');
});

When('I send a GET request', function () {
  cy.get('@url').then((url) => {
    cy.request({
      method: 'GET',
      url,
      failOnStatusCode: false
    }).then((res) => {
      
      response = res;
      cy.writeFile('cypress/fixtures/getMultipleUsersApiResponse.json', response.body);
    });
  });
});

Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);
});

Then('the response should contain a user ID', () => {
  expect(response.body.data.id).to.exist;
});

Then('the response should contain a user email {string}', (expectedEmail) => {
  expect(response.body.data.email).to.eql(expectedEmail);
});