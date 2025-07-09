@api @agify
Feature: Agify.io API Age Prediction
  As a developer using the Agify.io API
  I want to predict the age of a person based on their name
  So that I can get demographic insights from name data

  Background:
    Given the Agify.io API is available

  @smoke @positive
  Scenario: Successfully predict age for a valid name
    When I request age prediction for name "michael"
    Then the API should return a successful response
    And the response should contain the name "michael"
    And the response should contain a numeric age
    And the response should contain a count value greater than 0

  @smoke @positive
  Scenario: Successfully predict age for the example name from requirements
    When I request age prediction for name "billybob"
    Then the API should return a successful response
    And the response should contain the name "billybob"
    And the response should contain a numeric age
    And the response should contain a count value greater than 0

  @positive
  Scenario Outline: Successfully predict age for various names
    When I request age prediction for name "<name>"
    Then the API should return a successful response
    And the response should contain the name "<name>"
    And the response should contain a numeric age
    And the response should contain a count value greater than 0

    Examples:
      | name      |
      | john      |
      | mary      |
      | david     |
      | sarah     |
      | james     |
      | emma      |

  @positive
  Scenario: Verify response structure and data types
    When I request age prediction for name "alice"
    Then the API should return a successful response
    And the response should have the correct JSON structure

  @positive
  Scenario: Handle names with different cases
    When I request age prediction for name "ROBERT"
    Then the API should return a successful response
    And the response should contain the name "ROBERT"
    And the response should contain a numeric age

  @positive
  Scenario: Handle names with special characters
    When I request age prediction for name "josé"
    Then the API should return a successful response
    And the response should contain the name "josé"
    And the response should contain a numeric age

  @edge-case
  Scenario: Handle very short names
    When I request age prediction for name "a"
    Then the API should return a successful response
    And the response should contain the name "a"

  @edge-case
  Scenario: Handle longer names
    When I request age prediction for name "christopher"
    Then the API should return a successful response
    And the response should contain the name "christopher"
    And the response should contain a numeric age

  @negative
  Scenario: Handle empty name parameter
    When I request age prediction for name ""
    Then the API should return an error response
    And the response should indicate missing or invalid name parameter

  @negative
  Scenario: Handle request without name parameter
    When I send a request without a name parameter
    Then the API should return an error response
    And the response should indicate missing name parameter

  @performance
  Scenario: API response time should be reasonable
    When I request age prediction for name "testuser"
    Then the API should return a successful response
    And the response time should be less than 5 seconds

  @reliability
  Scenario: API should handle multiple consecutive requests
    When I request age prediction for name "user1"
    And I request age prediction for name "user2"
    And I request age prediction for name "user3"
    Then all API requests should return successful responses
    And each response should contain the correct corresponding name 