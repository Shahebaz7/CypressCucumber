@getMultipleUsers

Feature: Get User API

  Scenario: Retrieve a user successfully
    Given I have the "/api/users/2" endpoint
    When I send a GET request
    Then the response status should be 200
    Then the response should contain a user ID
    Then the response should contain a user email "janet.weaver@reqres.in"