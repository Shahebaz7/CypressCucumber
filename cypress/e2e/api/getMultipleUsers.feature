@getMultipleUsers
Feature: Get Multiple Users API

  Scenario Outline: Retrieve user details by user ID using env endpoint
    Given I have the GET user endpoint with user ID "<userId>"
    When I send a GET request
    Then the response status should be 200
    Then the response should contain a user ID <userId>
    Then the response should contain a user email "<email>"

    Examples:
      | userId | email                    |
      | 2      | janet.weaver@reqres.in   |
      | 3      | eve.holt@reqres.in       |
      | 4      | charles.morris@reqres.in |