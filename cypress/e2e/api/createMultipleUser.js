import { Given, When, Then, After} from '@badeball/cypress-cucumber-preprocessor';
//import { API_ENDPOINTS } from '../constants/apiEndpoints';
//import { url, response } from './getMultipleUsers';
//Test - Create Multiple User 
let response;
let userResponses = {};
//const baseUrl = Cypress.env('baseUrl');
const endpoints = Cypress.env('endpoints');
const headers = Cypress.env('headers');
//WorkingOneconst url = Cypress.env('baseUrl');
const baseUrl = Cypress.config('baseUrl');
const apikey = Cypress.env('apiKey');
//cy.log(url);
//const endpoint = Cypress.env('endpoints').createUsers;

Given('I have the POST endpoint', () => {
  cy.log('✅ Reached Given step');
  cy.log("Hello");
  cy.log(baseUrl);
  //cy.wrap(baseUrl + endpoints).as('url');
  const fullUrl = baseUrl + endpoints.createUsers; // 👈 this is the correct call
  cy.wrap(fullUrl).as('url');
});


When('I send a POST request with name {string} and job {string}', function (name, job) {
  const body = {
    name,
    job
  };
  cy.get('@url').then((url) => {
    cy.request({
      method: 'POST',
      url,
      headers: headers,
      body,
      failOnStatusCode: false
    }).then((res) => {
        
      response = res;
      userResponses[name] = {
        id: res.body.id,
        name: res.body.name,
        job: res.body.job
      };
      //console.log('Response Body:', response.body);
      //cy.writeFile('cypress/fixtures/apiResponse.json', response.body);
    });
  });
});
Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);
});
Then('the response should contain a user ID', () => {
  expect(response.body.id).to.exist;
});
Then('the response should contain a name {string}', (expectedName) => {
  expect(response.body.name).to.eql(expectedName);
});
Then('the response should contain a job {string}', (expectedJob) => {
    expect(response.body.job).to.eql(expectedJob);
  });
  After(() => {
    if (Object.keys(userResponses).length) {
      cy.writeFile('cypress/fixtures/apiResponse.json', userResponses);
    }
  });