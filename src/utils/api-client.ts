import axios from 'axios';

export interface AgifyResponse {
  name: string;
  age: number;
  count: number;
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
} 