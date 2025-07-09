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

  async getAgeByNameWithCountry(name: string, countryId: string): Promise<any> {
    try {
      const response = await this.client.get('/', {
        params: { 
          name,
          country_id: countryId 
        }
      });
      return response;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }
  }

  getBaseURL(): string {
    return this.baseURL;
  }
} 