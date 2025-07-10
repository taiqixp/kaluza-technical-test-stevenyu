import axios from 'axios';

export interface AgifyResponse {
  name: string;
  age: number;
  count: number;
  country_id?: string;
}

export class ApiClient {
  private client: any;
  private baseURL: string;

  constructor(baseURL: string = 'https://api.agify.io') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Kaluza-QA-Test/1.0.0'
      }
    });
  }

  async getAgeByName(name: string): Promise<any> {
    try {
      const response = await this.client.get('/', {
        params: { name }
      });
      return response;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }
  }

  async getAgeByNameWithCountry(name: string, countryId: string): Promise<any> {
    try {
      const response = await this.client.get('/', {
        params: { 
          name: name,
          country_id: countryId 
        }
      });
      return response;
    } catch (error) {
      throw new Error(`API request with country failed: ${error}`);
    }
  }

  // For testing API key authentication
  async getAgeByNameWithApiKey(name: string, apiKey: string): Promise<any> {
    try {
      const response = await this.client.get('/', {
        params: { 
          name: name,
          apikey: apiKey 
        }
      });
      return response;
    } catch (error: any) {
      // For axios errors, I want to preserve the response information
      if (error.response) {
        // Create a custom error that includes response information
        const customError = new Error(`API request with API key failed: ${error}`);
        (customError as any).response = error.response;
        throw customError;
      }
      throw new Error(`API request with API key failed: ${error}`);
    }
  }

  async getAgeByNames(names: string[]): Promise<any> {
    try {
      // Manually construct the URL with name[]=value&name[]=value format
      const nameParams = names.map(name => `name[]=${encodeURIComponent(name)}`).join('&');
      const url = `/?${nameParams}`;
      
      const response = await this.client.get(url);
      return response;
    } catch (error) {
      throw new Error(`Batch API request failed: ${error}`);
    }
  }

  // For testing unsupported HTTP methods
  // Note: This method intentionally sends a POST request to test error handling
  // HTTP standards require 405 Method Not Allowed, but agify.io returns 404 (see BUG-001)
  async makePostRequest(): Promise<any> {
    try {
      const response = await this.client.post('/', {
        name: 'testuser'
      });
      return response;
    } catch (error) {
      throw new Error(`POST request failed: ${error}`);
    }
  }

  // For testing wrong endpoints
  async makeRequestToEndpoint(endpoint: string): Promise<any> {
    try {
      const response = await this.client.get(endpoint, {
        params: { name: 'testuser' }
      });
      return response;
    } catch (error) {
      throw new Error(`Request to ${endpoint} failed: ${error}`);
    }
  }

  // For testing missing name parameter
  async makeRequestWithoutNameParam(): Promise<any> {
    try {
      // Make request without any parameters to test missing name parameter
      const response = await this.client.get('/');
      return response;
    } catch (error) {
      throw new Error(`Request without name parameter failed: ${error}`);
    }
  }
} 