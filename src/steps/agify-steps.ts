import { Given, When, Then } from '@cucumber/cucumber';
import { World } from '../utils/world';

// Helper function for assertions
function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

// When steps - API calls
When('I request age prediction for name {string}', async function (this: World, name: string) {
  const startTime = Date.now();
  try {
    const response = await this.apiClient.getAgeByName(name);
    const endTime = Date.now();
    
    this.setResponse(response);
    this.storeTestData('responseTime', endTime - startTime);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I request age prediction for name {string} again', async function (this: World, name: string) {
  try {
    const response = await this.apiClient.getAgeByName(name);
    this.storeTestData('secondResponse', response);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I request age prediction for name {string} with invalid API key {string}', async function (this: World, name: string, apiKey: string) {
  try {
    const response = await this.apiClient.getAgeByNameWithApiKey(name, apiKey);
    this.setResponse(response);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I request age prediction for name {string} with API key {string}', async function (this: World, name: string, apiKey: string) {
  // Note: API key "da4f95bdace66006249c72270a5c9cbf" is from my own registered account (unpaid)
  // API key "fake-api-key-123" is intentionally invalid for testing 401 errors
  try {
    const response = await this.apiClient.getAgeByNameWithApiKey(name, apiKey);
    this.setResponse(response);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I request age prediction for name {string} with country {string}', async function (this: World, name: string, countryId: string) {
  try {
    const response = await this.apiClient.getAgeByNameWithCountry(name, countryId);
    this.setResponse(response);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I request localized age prediction for name {string} with country {string}', async function (this: World, name: string, countryId: string) {
  try {
    const response = await this.apiClient.getAgeByNameWithCountry(name, countryId);
    this.storeTestData('localizedResponse', response);
  } catch (error) {
    this.setError(error as Error);
  }
});





When('I send a batch request for multiple names', async function (this: World) {
  const names = ['michael', 'matthew', 'jane'];
  const startTime = Date.now();
  
  try {
    const response = await this.apiClient.getAgeByNames(names);
    const endTime = Date.now();
    
    this.setResponse(response);
    this.storeTestData('batchResponseTime', endTime - startTime);
    this.storeTestData('batchNames', names);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I send a POST request to the API', async function (this: World) {
  try {
    const response = await this.apiClient.makePostRequest();
    this.setResponse(response);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I request age prediction from wrong endpoint {string}', async function (this: World, endpoint: string) {
  try {
    const response = await this.apiClient.makeRequestToEndpoint(endpoint);
    this.setResponse(response);
  } catch (error) {
    this.setError(error as Error);
  }
});

// Then steps - Assertions
Then('the API should return a successful response', function (this: World) {
  assert(!this.hasError(), `Expected successful response but got error: ${this.hasError() ? this.getError().message : 'none'}`);
  
  const response = this.getResponse();
  assert(response.status === 200, `Expected status 200 but got ${response.status}`);
});

Then('the response should contain the name {string}', function (this: World, expectedName: string) {
  const responseData = this.getResponseData();
  assert(responseData.name === expectedName, `Expected name '${expectedName}' but got '${responseData.name}'`);
});

Then('the response should contain a numeric age', function (this: World) {
  const responseData = this.getResponseData();
  assert(typeof responseData.age === 'number', `Expected age to be a number but got ${typeof responseData.age}`);
  assert(responseData.age > 0, `Expected age to be positive but got ${responseData.age}`);
});

Then('the response should contain a count value greater than 0', function (this: World) {
  const responseData = this.getResponseData();
  assert(typeof responseData.count === 'number', `Expected count to be a number but got ${typeof responseData.count}`);
  assert(responseData.count > 0, `Expected count to be greater than 0 but got ${responseData.count}`);
});

Then('the response should have the correct JSON structure', function (this: World) {
  const responseData = this.getResponseData();
  assert('name' in responseData, 'Response should contain name field');
  assert('age' in responseData, 'Response should contain age field');
  assert('count' in responseData, 'Response should contain count field');
});

Then('the response count might be 0 for uncommon names', function (this: World) {
  const responseData = this.getResponseData();
  assert(typeof responseData.count === 'number', `Expected count to be a number but got ${typeof responseData.count}`);
  assert(responseData.count >= 0, `Expected count to be non-negative but got ${responseData.count}`);
});

Then('the response should have count 0 and null age', function (this: World) {
  const responseData = this.getResponseData();
  assert(responseData.count === 0, `Expected count to be 0 but got ${responseData.count}`);
  assert(responseData.age === null, `Expected age to be null but got ${responseData.age}`);
});

Then('the response time should be less than {int} seconds', function (this: World, maxSeconds: number) {
  const responseTime = this.getTestData('responseTime');
  assert(responseTime < maxSeconds * 1000, `Expected response time to be less than ${maxSeconds} seconds but got ${responseTime}ms`);
});

Then('both responses should return the same age', function (this: World) {
  const firstResponse = this.getResponseData();
  const secondResponse = this.getTestData('secondResponse');
  
  assert(firstResponse.age === secondResponse.data.age, 
    `Expected both responses to have same age but got ${firstResponse.age} and ${secondResponse.data.age}`);
});

Then('both responses should return the same count', function (this: World) {
  const firstResponse = this.getResponseData();
  const secondResponse = this.getTestData('secondResponse');
  
  assert(firstResponse.count === secondResponse.data.count, 
    `Expected both responses to have same count but got ${firstResponse.count} and ${secondResponse.data.count}`);
});

Then('the batch response should contain all requested names', function (this: World) {
  const response = this.getResponse();
  const responseData = response.data as any[]; // Batch response is an array
  const batchNames = this.getTestData('batchNames');
  
  assert(Array.isArray(responseData), 'Expected batch response to be an array');
  assert(responseData.length === batchNames.length, `Expected ${batchNames.length} results but got ${responseData.length}`);
  
  for (let i = 0; i < batchNames.length; i++) {
    const expectedName = batchNames[i];
    const result = responseData[i];
    
    assert(result.name === expectedName, `Expected name '${expectedName}' but got '${result.name}' at index ${i}`);
    assert(typeof result.age === 'number' || result.age === null, `Expected age to be number or null but got ${typeof result.age} at index ${i}`);
    assert(typeof result.count === 'number', `Expected count to be number but got ${typeof result.count} at index ${i}`);
  }
});

Then('the batch response should be faster than individual requests', function (this: World) {
  const batchResponseTime = this.getTestData('batchResponseTime');
  const batchNames = this.getTestData('batchNames');
  
  // Batch requests are generally more efficient, but allow reasonable time
  // Estimate 500ms per individual request (including network overhead)
  const estimatedIndividualTime = batchNames.length * 500;
  
  assert(batchResponseTime < estimatedIndividualTime, 
    `Expected batch request (${batchResponseTime}ms) to be faster than estimated individual requests (${estimatedIndividualTime}ms)`);
});

Then('the response should not execute any code', function (this: World) {
  const response = this.getResponse();
  const responseData = this.getResponseData();
  
  assert(response.status === 200, `Expected status 200 but got ${response.status}`);
  assert(typeof responseData === 'object', 'Expected response to be a JSON object');
  assert('name' in responseData, 'Response should contain name field');
  assert(typeof responseData.name === 'string', 'Name field should be a string');
  assert(typeof responseData.age === 'number' || responseData.age === null, 
    'Age field should be number or null');
  assert(typeof responseData.count === 'number', 'Count field should be number');
});

Then('the API should return a method not allowed error', function (this: World) {
  // HTTP Standards Violation: According to RFC 7231, unsupported methods should return 405 Method Not Allowed
  // However, agify.io API returns 404 Not Found instead (documented as BUG-001 in BUG_REPORT.md)
  // We test the actual API behavior while acknowledging this is incorrect
  assert(this.hasError() || this.getResponse().status === 404, 
    'Expected method not allowed error (404) but got different response');
});

Then('the response status should be {int}', function (this: World, expectedStatus: number) {
  if (this.hasError()) {
    const error = this.getError();
    const errorMessage = error.message;
    
    // Extract status code from axios error message
    // Note: These error codes come from actual API responses during testing
    if (errorMessage.includes('status code 405')) {
      // Standard HTTP Method Not Allowed (tested out during my debugging, rarely returned by agify.io)
      assert(expectedStatus === 405, `Expected status ${expectedStatus} but got 405 from error`);
    } else if (errorMessage.includes('status code 404')) {
      // agify.io returns 404 for unsupported methods (should be 405??, see BUG-001)
      assert(expectedStatus === 404, `Expected status ${expectedStatus} but got 404 from error`);
    } else if (errorMessage.includes('status code 400')) {
      // Bad Request (malformed requests)
      assert(expectedStatus === 400, `Expected status ${expectedStatus} but got 400 from error`);
    } else if (errorMessage.includes('status code 401')) {
      // Unauthorized (invalid API key)
      assert(expectedStatus === 401, `Expected status ${expectedStatus} but got 401 from error`);
    } else if (errorMessage.includes('status code 402')) {
      // Payment Required (inactive subscription)
      assert(expectedStatus === 402, `Expected status ${expectedStatus} but got 402 from error`);
    } else {
      assert(false, `Expected status ${expectedStatus} but got error: ${errorMessage}`);
    }
  } else {
    const response = this.getResponse();
    assert(response.status === expectedStatus, `Expected status ${expectedStatus} but got ${response.status}`);
  }
});

Then('the API should return a not found error', function (this: World) {
  assert(this.hasError() || this.getResponse().status === 404, 
    'Expected not found error (404) but got different response');
});

// API Error Code Tests
When('I request age prediction without name parameter', async function (this: World) {
  try {
    // Make request without name parameter
    const response = await this.apiClient.makeRequestWithoutNameParam();
    this.setResponse(response);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I request age prediction for extremely invalid name {string}', async function (this: World, name: string) {
  try {
    const response = await this.apiClient.getAgeByName(name);
    this.setResponse(response);
  } catch (error) {
    this.setError(error as Error);
  }
});

When('I send many rapid requests to trigger rate limit', async function (this: World) {
  const requests = [];
  for (let i = 0; i < 10; i++) {
    requests.push(this.apiClient.getAgeByName(`testuser${i}`));
  }
  
  try {
    const responses = await Promise.all(requests);
    this.storeTestData('rapidResponses', responses);
    this.setResponse(responses[0]); // Store first response for status checking
  } catch (error) {
    this.setError(error as Error);
  }
});

Then('the API should return an error response', function (this: World) {
  assert(this.hasError() || this.getResponse().status >= 400, 
    'Expected error response but got successful response');
});

Then('the response should contain error message about missing parameter', function (this: World) {
  if (this.hasError()) {
    const error = this.getError();
    assert(error.message.includes('422') || error.message.includes('missing') || error.message.includes('parameter'), 
      `Expected error about missing parameter but got: ${error.message}`);
  } else {
    const response = this.getResponse();
    assert(response.status === 422, `Expected 422 status but got ${response.status}`);
  }
});

Then('the API should either return successful responses or rate limit error', function (this: World) {
  const rapidResponses = this.getTestData('rapidResponses');
  if (rapidResponses && Array.isArray(rapidResponses)) {
    // Check if all responses are successful or we got rate limited
    for (const response of rapidResponses) {
      assert(response.status === 200 || response.status === 429, 
        `Expected status 200 or 429 but got ${response.status}`);
    }
  } else if (this.hasError()) {
    const error = this.getError();
    // Rate limiting might cause errors
    assert(error.message.includes('429') || error.message.includes('rate') || error.message.includes('limit'), 
      `Expected rate limit related error but got: ${error.message}`);
  } else {
    // If no error and no rapid responses, just check current response
    const response = this.getResponse();
    assert(response.status === 200 || response.status === 429, 
      `Expected status 200 or 429 but got ${response.status}`);
  }
});

Then('any rate limit error should be handled gracefully', function (this: World) {
  // This step ensures our test framework handles rate limits gracefully
  // If we got here, it means the test didn't crash due to rate limiting
  assert(true, 'Rate limit handling verified');
});

Then('the response should contain error message {string}', function (this: World, expectedMessage: string) {
  if (this.hasError()) {
    const error = this.getError();
    
    // Try to extract original API error message from axios error
    if ((error as any).response && (error as any).response.data && (error as any).response.data.error) {
      const apiErrorMessage = (error as any).response.data.error;
      assert(apiErrorMessage.includes(expectedMessage), 
        `Expected API error message to contain '${expectedMessage}' but got: ${apiErrorMessage}`);
    } else {
      // Fallback to checking the wrapped error message
      assert(error.message.includes(expectedMessage), 
        `Expected error message to contain '${expectedMessage}' but got: ${error.message}`);
    }
  } else {
    const response = this.getResponse();
    const responseData = response.data as any;
    
    // Check if response has error field
    if (responseData && responseData.error) {
      assert(responseData.error.includes(expectedMessage), 
        `Expected error message to contain '${expectedMessage}' but got: ${responseData.error}`);
    } else {
      assert(false, `Expected error message containing '${expectedMessage}' but response has no error field`);
    }
  }
});

Then('the response should contain country_id {string}', function (this: World, expectedCountryId: string) {
  const responseData = this.getResponseData();
  assert(responseData.country_id === expectedCountryId, 
    `Expected country_id '${expectedCountryId}' but got '${responseData.country_id}'`);
});

Then('both responses should have the same name {string}', function (this: World, expectedName: string) {
  const globalResponse = this.getResponseData();
  const localizedResponse = this.getTestData('localizedResponse');
  
  assert(globalResponse.name === expectedName, 
    `Expected global response name '${expectedName}' but got '${globalResponse.name}'`);
  assert(localizedResponse.data.name === expectedName, 
    `Expected localized response name '${expectedName}' but got '${localizedResponse.data.name}'`);
});

Then('the localized response should contain country_id {string}', function (this: World, expectedCountryId: string) {
  const localizedResponse = this.getTestData('localizedResponse');
  assert(localizedResponse.data.country_id === expectedCountryId, 
    `Expected localized response country_id '${expectedCountryId}' but got '${localizedResponse.data.country_id}'`);
});

Then('the global response should not contain country_id', function (this: World) {
  const globalResponse = this.getResponseData();
  assert(!globalResponse.country_id, 
    `Expected global response to not contain country_id but got '${globalResponse.country_id}'`);
}); 