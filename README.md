# Agify.io API Testing Framework

A BDD testing framework for the [agify.io](https://agify.io) API using TypeScript and Cucumber.

## Overview

This project tests the agify.io API which predicts age based on names. The API returns JSON with `name`, `age`, and `count` fields.

**API Details:**
- Base URL: `https://api.agify.io`
- Example: `https://api.agify.io?name=billybob` → `{"count":67,"name":"billybob","age":60}`
- Free limit: 100 requests per day

## Installation

```bash
npm install
```

## Usage

### Basic Commands
```bash
# Run all tests
npm test

# Run core tests (most important)
npm run test:core

# Run positive tests
npm run test:positive

# Run edge cases
npm run test:edge

# Run security tests
npm run test:security

# Run negative tests
npm run test:negative

# Run batch tests
npm run test:batch

# Dry run (no actual API calls)
npm run test:dry
```

## Test Scenarios

### Core Tests (@core) - 3 scenarios
- Required 'billybob' test from assignment
- Common name test
- Response structure validation

### Positive Tests (@positive) - 6 scenarios
- Various name combinations
- Case sensitivity
- Special characters
- Long names

### Edge Cases (@edge-case) - 7 scenarios
- Very short names
- Empty parameters
- Names with numbers
- Names with spaces/hyphens
- Uncommon names

### Security Tests (@security) - 2 scenarios
- XSS injection prevention
- SQL injection prevention

### Other Tests
- Batch processing (1 scenario)
- Data validation (2 scenarios)
- Error handling (2 scenarios)
- Performance (1 scenario)

**Total: 23 test scenarios**

## Project Structure

```
src/
├── steps/
│   ├── agify-steps.ts    # Step definitions
│   └── hooks.ts          # Test setup
└── utils/
    ├── api-client.ts     # HTTP client
    └── world.ts          # Test context
features/
└── agify-api-main.feature    # Test scenarios
```

## API Usage

The complete test suite uses approximately 23 API calls. With the 100/day limit, you can run the full suite about 4 times per day.

For development, use:
```bash
npm run test:core  # Only 3 API calls
```

## Dependencies

- `@cucumber/cucumber` - BDD framework
- `axios` - HTTP client
- `typescript` - Type safety
- `ts-node` - TypeScript execution

## Notes

- Tests are written in Gherkin (BDD) format
- All API responses are validated for structure and content
- Error handling is tested for invalid inputs
- Security tests verify input sanitization 