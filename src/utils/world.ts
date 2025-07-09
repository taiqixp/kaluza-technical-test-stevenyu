import { World as CucumberWorld, IWorldOptions } from '@cucumber/cucumber';
import { ApiClient, AgifyResponse } from './api-client';

export class World extends CucumberWorld {
  public apiClient: ApiClient;
  public lastResponse?: any;
  public lastError?: Error;
  public testData: Map<string, any>;

  constructor(options: IWorldOptions) {
    super(options);
    this.apiClient = new ApiClient();
    this.testData = new Map();
  }

  public setResponse(response: any): void {
    this.lastResponse = response;
    this.lastError = undefined;
  }

  public setError(error: Error): void {
    this.lastError = error;
    this.lastResponse = undefined;
  }

  public getResponse(): any {
    if (!this.lastResponse) {
      throw new Error('No response available. Make sure to call the API first.');
    }
    return this.lastResponse;
  }

  public getResponseData(): AgifyResponse {
    return this.getResponse().data;
  }

  public hasError(): boolean {
    return this.lastError !== undefined;
  }

  public getError(): Error {
    if (!this.lastError) {
      throw new Error('No error available.');
    }
    return this.lastError;
  }

  public storeTestData(key: string, value: any): void {
    this.testData.set(key, value);
  }

  public getTestData(key: string): any {
    return this.testData.get(key);
  }

  public clearTestData(): void {
    this.testData.clear();
  }

  public reset(): void {
    this.lastResponse = undefined;
    this.lastError = undefined;
    this.clearTestData();
  }
} 