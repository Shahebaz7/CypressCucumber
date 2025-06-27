import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let response;
const url = Cypress.config('baseUrlFakerest'); // or Cypress.env('baseUrl')

Given('I have the POST endpoint {string}', (endpoint) => {
  cy.wrap(url + endpoint).as('url');
});

When('I send a POST request with id {int}, title {string}, dueDate {string} and completed {string}', function (id, title, dueDate, completed) {
  const body = {
    id,
    title,
    dueDate,
    completed
  };

  cy.get('@url').then((url) => {
    cy.request({
      method: 'POST',
      url,
      body,
      failOnStatusCode: false
    }).then((res) => {
      response = res;
    });
  });
});

Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);
});

Then('the response should contain a user ID', () => {
  expect(response.body.id).to.exist;
});