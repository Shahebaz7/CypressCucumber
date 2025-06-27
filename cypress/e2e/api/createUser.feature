@createUser
Feature: Create a new user via API

  Scenario: User is created successfully
    Given I have the POST endpoint "/api/users"
    When I send a POST request with valid user data
    Then the response status should be 201
    And the response should contain a user ID