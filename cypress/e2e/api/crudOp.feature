@crudOp
Feature: Reqres API CRUD operations

  Scenario Outline: Create user
    Given I create a user with name "<name>" and job "<job>"

    Examples:
      | name   | job         |
      | John | QA Lead     |
      | Ella   | Developer   |
      | Mike    | Tester      |

  Scenario Outline: Update user
    Given I update user with ID "<id>" to name "<name>" and job "<job>"

    Examples:
      | id | name          | job           |
      | 2  | John Updated | Lead QA      |
      | 3  | Ella Updated   | Sr Developer |

  Scenario Outline: Delete user
    Given I delete user with ID "<id>"

    Examples:
      | id |
      | 2  |
      | 3  |

  Scenario Outline: Get user by ID
    Given I fetch user with ID "<id>"

    Examples:
      | id |
      | 1  |
      | 2  |