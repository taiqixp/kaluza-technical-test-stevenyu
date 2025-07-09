import { AgifyResponse } from './api-client';

export class TestHelpers {
  /**
   * Validates that a response has the expected structure
   */
  static validateResponseStructure(response: AgifyResponse): boolean {
    return (
      typeof response.name === 'string' &&
      typeof response.age === 'number' &&
      typeof response.count === 'number' &&
      response.age >= 0 &&
      response.count >= 0
    );
  }

  /**
   * Generates test data for various name scenarios
   */
  static getTestNames(): { [key: string]: string[] } {
    return {
      common: ['john', 'mary', 'david', 'sarah', 'james', 'emma'],
      uncommon: ['zyxwvutsrq', 'qwertyuiop', 'asdfghjkl'],
      international: ['josé', 'muhammad', 'wei', 'priya', 'olaf'],
      edgeCases: ['a', 'ab', 'supercalifragilisticexpialidocious'],
      withSpecialChars: ['mary-jane', "o'connor", 'jean-luc', 'john123'],
      caseVariations: ['ROBERT', 'robert', 'RoBeRt', 'MARY', 'mary']
    };
  }

  /**
   * Generates test country codes
   */
  static getTestCountries(): string[] {
    return ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE'];
  }

  /**
   * Validates response time performance
   */
  static validateResponseTime(responseTime: number, maxTime: number = 5000): boolean {
    return responseTime < maxTime;
  }

  /**
   * Compares two responses for consistency
   */
  static compareResponses(response1: AgifyResponse, response2: AgifyResponse): boolean {
    return (
      response1.name === response2.name &&
      response1.age === response2.age &&
      response1.count === response2.count
    );
  }

  /**
   * Checks if a name is likely to have a high count (common names)
   */
  static isCommonName(name: string): boolean {
    const commonNames = this.getTestNames().common;
    return commonNames.includes(name.toLowerCase());
  }

  /**
   * Generates a random name for testing
   */
  static generateRandomName(): string {
    const prefixes = ['test', 'user', 'demo', 'sample'];
    const suffixes = ['123', '456', '789', 'abc', 'xyz'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  }

  /**
   * Delays execution for a specified time (useful for rate limiting tests)
   */
  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Validates that age is within reasonable bounds
   */
  static validateAgeRange(age: number): boolean {
    return age >= 0 && age <= 150; // Reasonable human age range
  }

  /**
   * Checks if count indicates sufficient data quality
   */
  static validateDataQuality(count: number, minCount: number = 1): boolean {
    return count >= minCount;
  }

  /**
   * Formats test results for reporting
   */
  static formatTestResult(name: string, response: AgifyResponse, responseTime: number): string {
    return `Name: ${name} | Age: ${response.age} | Count: ${response.count} | Time: ${responseTime}ms`;
  }

  /**
   * Calculates statistics for batch responses
   */
  static calculateBatchStats(responses: AgifyResponse[], responseTimes: number[]): {
    totalRequests: number;
    averageAge: number;
    averageCount: number;
    averageResponseTime: number;
    minAge: number;
    maxAge: number;
    minCount: number;
    maxCount: number;
  } {
    const totalRequests = responses.length;
    const totalAge = responses.reduce((sum, r) => sum + r.age, 0);
    const totalCount = responses.reduce((sum, r) => sum + r.count, 0);
    const totalTime = responseTimes.reduce((sum, t) => sum + t, 0);

    const ages = responses.map(r => r.age);
    const counts = responses.map(r => r.count);

    return {
      totalRequests,
      averageAge: totalAge / totalRequests,
      averageCount: totalCount / totalRequests,
      averageResponseTime: totalTime / responseTimes.length,
      minAge: Math.min(...ages),
      maxAge: Math.max(...ages),
      minCount: Math.min(...counts),
      maxCount: Math.max(...counts)
    };
  }

  /**
   * Validates API error responses
   */
  static validateErrorResponse(error: any, expectedErrorType?: string): boolean {
    if (!error) return false;
    
    // Check if it's an axios error
    if (error.isAxiosError) {
      return true;
    }
    
    // Check if it's a general error
    if (error instanceof Error) {
      return true;
    }
    
    return false;
  }

  /**
   * Creates a test report summary
   */
  static createTestSummary(testResults: any[]): string {
    const passed = testResults.filter(r => r.status === 'passed').length;
    const failed = testResults.filter(r => r.status === 'failed').length;
    const total = testResults.length;
    
    return `
Test Summary:
=============
Total Tests: ${total}
Passed: ${passed}
Failed: ${failed}
Success Rate: ${((passed / total) * 100).toFixed(2)}%
    `;
  }
} 