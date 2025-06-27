@createMultipleActivities
Feature: Create multiple activities API

  Scenario Outline: Create multiple activities with different names and jobs
    Given I have the POST endpoint "<endpoint>"
    When I send a POST request with name id "<id>", title "title", date "dueDate" and complete status "<completed>"
    Then the response status should be 200
    Then the response should contain a user ID

    Examples:
      | endpoint             | id     | title      | dueDate                    | completed  |
      | /api/v1/Activities   | 1      | Engineer   | 2025-04-23T11:19:39.925Z   | true       |
      | /api/v1/Activities   | 2      | Developer  | 2025-04-25T11:19:39.925Z   | true       |
      | /api/v1/Activities   | 3      | Designer   | 2025-04-29T11:19:39.925Z   | true       |