import { BeforeAll, AfterAll, Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { World } from '../utils/world';

// Set the World constructor
setWorldConstructor(World);

BeforeAll(async function () {
  console.log('================================');
  console.log('🚀 STARTING AGIFY.IO API TESTS');
  console.log('📍 Base URL: https://api.agify.io');
  console.log('👨‍💻 QA Engineer: Steven Yu');
  console.log('================================');
});

AfterAll(async function () {
  console.log('================================');
  console.log('🎯 ALL TESTS EXECUTION COMPLETED!');
  console.log('✅ Test Suite Finished Successfully');
  console.log('📧 Contact: Steven Yu (taiqixp@hotmail.com)');
  console.log('================================');
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