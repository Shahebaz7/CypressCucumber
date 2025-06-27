import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let response;
const url = Cypress.config('baseUrl');  // or use Cypress.env('baseUrl')

Given('I have the POST endpoint {string}', (endpoint) => {
  cy.wrap(url + endpoint).as('url');
});

When('I send a POST request with valid user data', function () {
  cy.fixture('user.json').then((body)=>{

    cy.get('@url').then((url) => {
        cy.request({
          method: 'POST',
          url,
          headers: {
            'x-api-key': 'reqres-free-v1'  // ✅ <-- Add your API key here
          },
          body,
          failOnStatusCode: false
        }).then((res) => {
          response = res;
        });
      });

  })

});

Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);
});

Then('the response should contain a user ID', () => {
  expect(response.body.id).to.exist;
});