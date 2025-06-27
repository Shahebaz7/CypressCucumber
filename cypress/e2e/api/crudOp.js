// cypress/e2e/step_definitions/api.steps.js
import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const headers = {
  'x-api-key': Cypress.env('apiKey'),
};

Given('I create a user with name {string} and job {string}', (name, job) => {
  cy.request({
    method: 'POST',
    url: API_ENDPOINTS.createUsers,
    headers,
    body: { name, job },
  }).then((response) => {
    expect(response.status).to.eq(201);
    cy.log(`Created user ID: ${response.body.id}`);
  });
});

Given('I update user with ID {string} to name {string} and job {string}', (id, name, job) => {
  cy.request({
    method: 'PUT',
    url: API_ENDPOINTS.updateUsers,
    headers,
    body: { name, job },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Given('I delete user with ID {string}', (id) => {
  cy.request({
    method: 'DELETE',
    url: API_ENDPOINTS.deleteUsers,
    headers,
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});

Given('I fetch user with ID {string}', (id) => {
  cy.request({
    method: 'GET',
    url: API_ENDPOINTS.getUsers(id),
    headers,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data.id).to.eq(Number(id));
  });
});