import { BeforeAll, AfterAll, Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { World } from '../utils/world';

// Set the World constructor
setWorldConstructor(World);

BeforeAll(async function () {
  console.log('Starting Agify.io API Tests...');
  console.log('Base URL: https://api.agify.io');
  console.log('================================');
});

AfterAll(async function () {
  console.log('================================');
  console.log('Agify.io API Tests Completed!');
});

Before(async function () {
  // Reset the world state before each scenario
  this.reset();
});

After(async function (scenario) {
  // Clean up after each scenario
  if (scenario.result?.status === 'FAILED') {
    console.log(`Scenario failed: ${scenario.pickle.name}`);
    if (this.hasError()) {
      console.log(`Error: ${this.getError().message}`);
    }
  }
  
  // Reset the world state after each scenario
  this.reset();
}); 