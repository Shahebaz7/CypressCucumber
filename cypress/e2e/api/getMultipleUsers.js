import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let response;
const baseUrl = Cypress.config('baseUrl');              // Loaded from qa.json
const endpoints = Cypress.env('endpoints');             // Access to endpoints
const headers = Cypress.env('headers');                 // Standard headers from env
const apiKey = Cypress.env('apiKey');                   // Optional: in case of auth headers

Given('I have the GET user endpoint with user ID {string}', function (userId) {
  const fullUrl = `${baseUrl}${endpoints.getUsers}${userId}`;
  cy.log("➡️ Final GET URL: " + fullUrl);
  cy.wrap(fullUrl).as('url');
});

When('I send a GET request', function () {
  cy.get('@url').then((url) => {
    cy.request({
      method: 'GET',
      url,
      headers: {
        ...headers, // includes Content-Type and x-api-key from qa.json
      },
      failOnStatusCode: false
    }).then((res) => {
      response = res;
    });
  });
});

Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);
});

Then('the response should contain a user ID {int}', (expectedId) => {
  expect(response.body.data.id).to.eq(expectedId);
});

Then('the response should contain a user email {string}', (expectedEmail) => {
  expect(response.body.data.email).to.eq(expectedEmail);
});
