@createMultipleUser
Feature: Create User API

  Scenario Outline: Create user with different names and jobs
    Given I have the POST endpoint
    When I send a POST request with name "<name>" and job "<job>"
    Then the response status should be 201
    Then the response should contain a user ID
    Then the response should contain a name "<name>"
    Then the response should contain a job "<job>"

    Examples:
      | name   | job        |
      | Bob    | Designer   |
      | Alice  | Developer  |
      | John   | Engineer   |