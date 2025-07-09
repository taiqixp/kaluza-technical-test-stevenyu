@api @agify @advanced
Feature: Agify.io API Advanced Features
  As a developer using the Agify.io API
  I want to test advanced features and edge cases
  So that I can ensure the API handles various scenarios correctly

  Background:
    Given the Agify.io API is available

  @positive @localization
  Scenario: Successfully predict age with country localization
    When I request age prediction for name "david" with country "US"
    Then the API should return a successful response
    And the response should contain the name "david"
    And the response should contain a numeric age
    And the response should contain a count value greater than 0

  @positive @localization
  Scenario Outline: Predict age for same name in different countries
    When I request age prediction for name "michael" with country "<country>"
    Then the API should return a successful response
    And the response should contain the name "michael"
    And the response should contain a numeric age

    Examples:
      | country |
      | US      |
      | GB      |
      | CA      |
      | AU      |
      | DE      |

  @edge-case
  Scenario: Handle names with numbers
    When I request age prediction for name "john123"
    Then the API should return a successful response
    And the response should contain the name "john123"

  @edge-case
  Scenario: Handle names with hyphens
    When I request age prediction for name "mary-jane"
    Then the API should return a successful response
    And the response should contain the name "mary-jane"

  @edge-case
  Scenario: Handle names with apostrophes
    When I request age prediction for name "o'connor"
    Then the API should return a successful response
    And the response should contain the name "o'connor"

  @edge-case
  Scenario: Handle very uncommon names
    When I request age prediction for name "zyxwvutsrq"
    Then the API should return a successful response
    And the response should contain the name "zyxwvutsrq"
    And the response count might be 0 for uncommon names

  @negative
  Scenario: Handle invalid country code
    When I request age prediction for name "john" with country "INVALID"
    Then the API should return a successful response
    And the response should contain the name "john"
    # API should gracefully handle invalid country codes

  @negative
  Scenario: Handle extremely long names
    When I request age prediction for name "supercalifragilisticexpialidocious"
    Then the API should return a successful response
    And the response should contain the name "supercalifragilisticexpialidocious"

  @performance
  Scenario: API should handle batch requests efficiently
    When I send multiple parallel requests for different names
    Then all requests should complete successfully
    And the total time should be reasonable for batch processing

  @data-validation
  Scenario: Verify age prediction consistency
    When I request age prediction for name "elizabeth"
    And I request age prediction for name "elizabeth" again
    Then both responses should return the same age
    And both responses should return the same count

  @data-validation
  Scenario: Verify count field represents data quality
    When I request age prediction for name "john"
    And I request age prediction for name "xyz123rare"
    Then the count for "john" should be significantly higher than "xyz123rare"
    And both responses should have valid numeric counts

  @api-limits
  Scenario: API should handle rate limiting gracefully
    When I send many requests in quick succession
    Then the API should either process all requests successfully
    Or return appropriate rate limiting responses 