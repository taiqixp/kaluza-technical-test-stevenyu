# Agify.io API Testing Framework

A comprehensive BDD (Behavior-Driven Development) testing framework for the [agify.io](https://agify.io) API, built with TypeScript and Cucumber.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Test Scenarios](#test-scenarios)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Reports](#reports)
- [Contributing](#contributing)
- [Technical Details](#technical-details)

## 🎯 Overview

This project implements a comprehensive testing suite for the agify.io API using BDD methodology. The API provides age predictions based on names, and this framework validates its functionality, performance, and reliability.

**About agify.io API:**
- **Base URL**: `https://api.agify.io`
- **Functionality**: Predicts age based on first names
- **Example**: `https://api.agify.io?name=billybob` returns `{"count":67,"name":"billybob","age":60}`
- **Free Usage**: Up to 100 names per day without API key
- **Response Format**: JSON with `name`, `age`, and `count` fields

## ✨ Features

- **BDD Testing**: Human-readable test scenarios using Cucumber
- **TypeScript**: Strongly-typed implementation for better maintainability
- **Comprehensive Coverage**: Tests for positive, negative, edge cases, and performance
- **API Client**: Robust HTTP client with error handling and timeout management
- **Test Utilities**: Helper functions for data validation and test management
- **Detailed Reporting**: HTML and JSON reports with test results
- **Parallel Execution**: Support for running tests in parallel for faster execution
- **Country-Specific Testing**: Support for testing localized age predictions
- **Performance Monitoring**: Response time validation and performance metrics

## 🔧 Prerequisites

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Internet Connection**: Required for API testing

## 📦 Installation

1. Clone or download the project
2. Install dependencies:

```bash
npm install
```

## 🚀 Usage

### Run All Tests
```bash
npm test
```

### Run Tests with Build
```bash
npm run build && npm test
```

### Run Specific Test Tags
```bash
# Run only smoke tests
npx cucumber-js --tags "@smoke"

# Run positive tests
npx cucumber-js --tags "@positive"

# Run negative tests
npx cucumber-js --tags "@negative"

# Run performance tests
npx cucumber-js --tags "@performance"
```

### Run Tests in Parallel
```bash
npm run test:parallel
```

### Dry Run (Validate Scenarios)
```bash
npm run test:dry
```

## 📊 Test Scenarios

### Core Functionality Tests
- ✅ Basic age prediction for valid names
- ✅ Response structure validation
- ✅ Data type validation
- ✅ Example name from requirements (`billybob`)

### Edge Cases
- ✅ Very short names (single character)
- ✅ Long names
- ✅ Names with special characters
- ✅ Case sensitivity handling
- ✅ International characters (José, etc.)

### Negative Tests
- ✅ Empty name parameter
- ✅ Missing name parameter
- ✅ Invalid inputs

### Performance Tests
- ✅ Response time validation
- ✅ Batch request handling
- ✅ Rate limiting behavior

### Advanced Features
- ✅ Country-specific predictions
- ✅ Data consistency validation
- ✅ Reliability testing

## 📁 Project Structure

```
/
├── src/                    # Source code
│   ├── steps/             # Cucumber step definitions
│   │   ├── agify-steps.ts # Main step definitions
│   │   └── hooks.ts       # Test hooks and setup
│   └── utils/             # Utility modules
│       ├── api-client.ts  # HTTP client for agify.io API
│       ├── world.ts       # Cucumber World class
│       ├── test-helpers.ts # Test utility functions
│       └── constants.ts   # Configuration constants
├── features/              # BDD feature files
│   ├── agify-api.feature  # Main API tests
│   └── agify-api-advanced.feature # Advanced tests
├── reports/              # Test reports (generated)
├── dist/                 # Compiled TypeScript (generated)
├── cucumber.js           # Cucumber configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## ⚙️ Configuration

### Environment Variables
No environment variables are required for basic usage.

### API Configuration
API settings can be modified in `src/utils/constants.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://api.agify.io',
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  USER_AGENT: 'Kaluza-QA-Test/1.0.0'
};
```

### Test Configuration
Test parameters can be adjusted in `src/utils/constants.ts`:

```typescript
export const TEST_CONFIG = {
  DEFAULT_TIMEOUT: 30000,
  MAX_RESPONSE_TIME: 5000,
  BATCH_SIZE: 10,
  RATE_LIMIT_DELAY: 100,
  PERFORMANCE_THRESHOLD: 2000
};
```

## 🏃 Running Tests

### Available Scripts

- `npm run build` - Compile TypeScript
- `npm test` - Run all tests
- `npm run test:dry` - Validate scenarios without execution
- `npm run test:parallel` - Run tests in parallel
- `npm run clean` - Clean build artifacts and reports

### Test Execution Flow

1. **Build**: TypeScript is compiled to JavaScript
2. **Setup**: Cucumber initializes the test environment
3. **Execution**: Feature files are processed and step definitions are executed
4. **Reporting**: Results are generated in HTML and JSON formats

## 📈 Reports

Test reports are generated in the `reports/` directory:

- **HTML Report**: `reports/cucumber-report.html` - Interactive HTML report
- **JSON Report**: `reports/cucumber-report.json` - Machine-readable results

### Sample Report Content
- Test execution summary
- Scenario results (passed/failed)
- Step-by-step execution details
- Performance metrics
- Error details for failed tests

## 🤝 Contributing

### Adding New Tests

1. Create or modify feature files in `features/`
2. Implement step definitions in `src/steps/`
3. Add utility functions in `src/utils/` if needed
4. Update documentation

### Code Standards

- Use TypeScript for type safety
- Follow BDD best practices
- Include comprehensive error handling
- Add appropriate comments and documentation
- Use consistent naming conventions

## 🔧 Technical Details

### Dependencies

**Runtime Dependencies:**
- `axios`: HTTP client for API requests

**Development Dependencies:**
- `@cucumber/cucumber`: BDD testing framework
- `typescript`: TypeScript compiler
- `ts-node`: TypeScript execution environment
- `@types/node`: Node.js type definitions

### API Client Features

- **Timeout Management**: Configurable request timeouts
- **Error Handling**: Comprehensive error catching and reporting
- **Country Support**: Optional country parameter for localized predictions
- **Response Validation**: Automatic response structure validation

### Testing Approach

- **BDD Methodology**: Tests written in natural language
- **Comprehensive Coverage**: Positive, negative, edge cases, and performance tests
- **Parallel Execution**: Faster test execution through parallel processing
- **Detailed Reporting**: Rich reporting with multiple output formats

### Performance Considerations

- **Response Time Monitoring**: All requests are timed
- **Batch Processing**: Efficient handling of multiple requests
- **Rate Limiting**: Respectful API usage patterns
- **Resource Management**: Proper cleanup and resource management

## 📞 Support

For questions or issues:
1. Check the test reports in `reports/`
2. Review the console output for detailed error messages
3. Verify API connectivity: `curl https://api.agify.io?name=test`

## 📝 License

This project is created for the Kaluza QA Engineer Technical Test.

---

**Created by**: QA Engineer - Kaluza Technical Test  
**Technology Stack**: TypeScript, Cucumber, Node.js  
**API Under Test**: [agify.io](https://agify.io)  
**Testing Framework**: BDD with Cucumber 