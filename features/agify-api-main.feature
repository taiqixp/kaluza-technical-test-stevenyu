@api @agify
Feature: Agify.io API Age Prediction Testing
  As a QA Engineer testing the Agify.io API
  I want to verify the API functionality and edge cases
  So that I can ensure the API works as expected

  # Smoke tests - Most important scenarios
  @smoke
  Scenario: Successfully predict age for the example name from requirements
    When I request age prediction for name "billybob"
    Then the API should return a successful response
    And the response should contain the name "billybob"
    And the response should contain a numeric age
    And the response should contain a count value greater than 0

  @smoke
  Scenario: Successfully predict age for a common name
    When I request age prediction for name "michael"
    Then the API should return a successful response
    And the response should contain the name "michael"
    And the response should contain a numeric age
    And the response should contain a count value greater than 0

  @smoke
  Scenario: Verify response structure and data types
    When I request age prediction for name "alice"
    Then the API should return a successful response
    And the response should have the correct JSON structure

  # Positive test cases
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
      | sarah     |

  @positive
  Scenario: Handle names with different cases
    When I request age prediction for name "ROBERT"
    Then the API should return a successful response
    And the response should contain the name "ROBERT"
    And the response should contain a numeric age

  @positive
  Scenario: Handle longer names
    When I request age prediction for name "christopher"
    Then the API should return a successful response
    And the response should contain the name "christopher"
    And the response should contain a numeric age

  @positive
  Scenario: Handle names with special characters
    When I request age prediction for name "josé"
    Then the API should return a successful response
    And the response should contain the name "josé"
    And the response should contain a numeric age

  @positive
  Scenario: Handle Chinese names
    When I request age prediction for name "李明"
    Then the API should return a successful response
    And the response should contain the name "李明"

  @positive
  Scenario: Verify age prediction consistency
    When I request age prediction for name "elizabeth"
    And I request age prediction for name "elizabeth" again
    Then both responses should return the same age
    And both responses should return the same count

  @positive
  Scenario: Verify case sensitivity consistency  
    When I request age prediction for name "john"
    And I request age prediction for name "JOHN" again
    Then both responses should return the same age
    And both responses should return the same count

  # Edge cases
  @edge-case
  Scenario: Handle very short names
    When I request age prediction for name "a"
    Then the API should return a successful response
    And the response should contain the name "a"

  @edge-case
  Scenario: Handle empty name parameter
    When I request age prediction for name ""
    Then the API should return a successful response
    And the response should contain the name ""
    And the response should have count 0 and null age

  @edge-case
  Scenario: Handle names with numbers
    When I request age prediction for name "john123"
    Then the API should return a successful response
    And the response should contain the name "john123"

  @edge-case
  Scenario: Handle names with spaces
    When I request age prediction for name "john max"
    Then the API should return a successful response
    And the response should contain the name "john max"

  @edge-case
  Scenario: Handle names with hyphens
    When I request age prediction for name "mary-jane"
    Then the API should return a successful response
    And the response should contain the name "mary-jane"

  @edge-case
  Scenario: Handle very uncommon names
    When I request age prediction for name "xyzzyx"
    Then the API should return a successful response
    And the response should contain the name "xyzzyx"
    And the response count might be 0 for uncommon names

  # Batch functionality tests
  @batch
  Scenario: Successfully predict age for multiple names in batch
    When I send a batch request for multiple names
    Then the API should return a successful response
    And the batch response should contain all requested names
    And the batch response should be faster than individual requests

  # Security tests
  @security
  Scenario: Handle potential XSS injection
    When I request age prediction for name "<script>alert('xss')</script>"
    Then the API should return a successful response
    And the response should contain the name "<script>alert('xss')</script>"
    And the response should not execute any code

  @security
  Scenario: Handle SQL injection attempt
    When I request age prediction for name "'; DROP TABLE users; --"
    Then the API should return a successful response
    And the response should contain the name "'; DROP TABLE users; --"
    And the response should not execute any code

  # Error handling tests
  @negative
  Scenario: Test unsupported HTTP method
    When I send a POST request to the API
    Then the API should return a method not allowed error
    And the response status should be 404

  @negative  
  Scenario: Test invalid endpoint
    When I request age prediction from wrong endpoint "/api/wrong"
    Then the API should return a not found error
    And the response status should be 404

  # Performance test
  @performance
  Scenario: API response time should be reasonable
    When I request age prediction for name "testuser"
    Then the API should return a successful response
    And the response time should be less than 5 seconds

  # Localization tests
  @localization
  Scenario: Successfully predict age with country localization
    When I request age prediction for name "michael" with country "US"
    Then the API should return a successful response
    And the response should contain the name "michael"
    And the response should contain a numeric age
    And the response should contain country_id "US"
    And the response should contain a count value greater than 0

  @localization
  Scenario Outline: Test age prediction with different countries
    When I request age prediction for name "anna" with country "<country_id>"
    Then the API should return a successful response
    And the response should contain the name "anna"
    And the response should contain country_id "<country_id>"
    And the response should contain a numeric age

    Examples:
      | country_id |
      | US         |
      | AU         |
      | CA         |
      | GB         |

  @localization
  Scenario: Compare age prediction with and without country
    When I request age prediction for name "david"
    And I request localized age prediction for name "david" with country "US"
    Then both responses should have the same name "david"
    And the localized response should contain country_id "US"
    And the global response should not contain country_id

  @localization
  Scenario: Handle invalid country code
    When I request age prediction for name "john" with country "INVALID"
    Then the API should return a successful response
    And the response should contain the name "john"
    And the response should contain country_id "INVALID"

  @localization
  Scenario: Test localization with international names
    When I request age prediction for name "josé" with country "ES"
    Then the API should return a successful response
    And the response should contain the name "josé"
    And the response should contain country_id "ES"

  @localization
  Scenario: Test Chinese names with China country code
    When I request age prediction for name "王磊" with country "CN"
    Then the API should return a successful response
    And the response should contain the name "王磊"
    And the response should contain country_id "CN"

  # API Error Code Tests
  @negative @error-codes
  Scenario: Handle missing name parameter (422 error)
    When I request age prediction without name parameter
    Then the API should return an error response
    And the response should contain error message about missing parameter

  @negative @error-codes
  Scenario: Handle invalid name parameter (422 error)
    When I request age prediction for extremely invalid name ""
    Then the API should return a successful response
    And the response should have count 0 and null age

  @negative @error-codes
  Scenario: Handle rate limiting gracefully (429 error)
    When I send many rapid requests to trigger rate limit
    Then the API should either return successful responses or rate limit error
    And any rate limit error should be handled gracefully

  @negative @error-codes
  Scenario: Handle invalid API key (401 error)
    When I request age prediction for name "john" with invalid API key "fake-api-key-123"
    Then the API should return an error response
    And the response status should be 401
    And the response should contain error message "Invalid API key"

  @negative @error-codes
  Scenario: Handle inactive subscription (402 error)
    # Note: This API key is from my own registered account (unpaid subscription)
    # Used to test 402 Payment Required error handling
    When I request age prediction for name "john" with API key "da4f95bdace66006249c72270a5c9cbf"
    Then the API should return an error response
    And the response status should be 402
    And the response should contain error message "No active subscription" 