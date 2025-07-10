# Agify.io API Testing Framework

A BDD testing framework for the [agify.io](https://agify.io) API using TypeScript and Cucumber.

For this interview assessment, which focuses on testing a single parameter, and considering the 100 requests per day API limit, I've included only basic test scenarios for the country_id parameter. 


## Overview

This project tests the agify.io API which predicts age based on names. The API returns JSON with `name`, `age`, and `count` fields.

**API Details:**
- Base URL: `https://api.agify.io`
- Example: `https://api.agify.io?name=billybob` → `{"count":67,"name":"billybob","age":60}`
- Localization: `https://api.agify.io?name=michael&country_id=US` → includes `country_id` in response
- Free limit: 100 requests per day

## Prerequisites

**Environment Requirements:**
- **Node.js**: >=16.0.0 (tested with v20.18.0)
- **npm**: >=8.0.0 (tested with v10.9.2)

**Check your versions:**
```bash
node --version  # Should be 16.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

## Installation

```bash
npm install
```

## Usage

### Basic Commands
```bash
# Run all tests
npm test

# Run smoke tests (most important)
npm run test:smoke

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

# Run performance tests  
npm run test:performance

# Run error code tests
npm run test:error-codes

# Run localization tests
npm run test:localization

# Dry run (no actual API calls)
npm run test:dry
```

## Test Scenarios

### Smoke Tests (@smoke) - 3 scenarios
- Required 'billybob' test from assignment
- Common name test
- Response structure validation

### Positive Tests (@positive) - 7 scenarios (10 when executed)
- Various name combinations (Scenario Outline: 3 executions)
- Case sensitivity
- Special characters (including Chinese names)
- Long names
- Age prediction consistency validation
- Case sensitivity consistency validation

### Edge Cases (@edge-case) - 6 scenarios
- Very short names
- Empty parameters
- Names with numbers
- Names with spaces/hyphens
- Uncommon names

### Security Tests (@security) - 2 scenarios
- XSS injection prevention
- SQL injection prevention

### Localization Tests (@localization) - 6 scenarios (9 when executed)
- Basic country_id parameter functionality
- Multiple country testing (Scenario Outline: 4 executions for US, AU, CA, GB)
- Comparison with global vs localized responses
- Invalid country code handling
- International names with localization (Spanish, Chinese)


### Other Tests
- Batch processing (1 scenario)
- Performance (1 scenario)
- Error handling & error codes (7 scenarios total)
  - Basic error handling (2 scenarios)
  - API error code testing (5 scenarios with @error-codes tag)

**Total: 31 test scenarios** (but 38 when executed due to Scenario Outline expansion)

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
BUG_REPORT.md                  # Issues found during testing
```

## API Usage

The complete test suite uses approximately 40+ API calls (31 test scenarios defined, 38+ when executed due to Scenario Outline expansion, plus some scenarios make multiple API calls). With the 100/day limit, you can run the full suite about 2 times per day.

For development, use:
```bash
npm run test:smoke  # Only 3 API calls
```

## Test Reports

After running tests, HTML and JSON reports are automatically generated in the `reports/` directory with timestamps:

```
reports/
├── cucumber-report-2025-07-10T10-36-34.html  # Detailed HTML report
└── cucumber-report-2025-07-10T10-36-34.json  # Machine-readable JSON
```

Open the HTML file in your browser to view a comprehensive test report with:
- Test execution details
- Pass/fail status
- Error screenshots and logs
- Execution timeline

## Technical Highlights

### BDD Methodology
- **Gherkin syntax** for readable test scenarios
- **Behavior-driven development** approach
- **Business-readable** test documentation

### Robust Testing Framework
- **Comprehensive error handling** (401, 402, 404, 422, 429)
- **International character support** (Chinese, Spanish names)
- **Security testing** (XSS, SQL injection)
- **Performance validation** (response time limits)
- **Rate limiting awareness** (respects API quotas)

### Professional Code Quality
- **TypeScript** for type safety and better IDE support
- **Modular architecture** with clear separation of concerns
- **Reusable components** (API client, World context)
- **Detailed logging** and error reporting

## Troubleshooting

### Rate Limit Reached (429 Error)
```bash
{"error":"Request limit reached"}
```
**Solution**: Wait for daily limit reset or use targeted tests:
```bash
npm run test:smoke  # Uses only 3 API calls
```

### Connection Issues
**Solution**: Verify internet connection and API availability:
```bash
curl https://api.agify.io?name=test
```

### Build Errors
**Solution**: Clean and rebuild:
```bash
npm run clean
npm install
npm run build
```

### Node.js/npm Version Issues
**Problem**: Older versions may cause compatibility issues

**Solution**: Update to required versions:
```bash
# Check current versions
node --version && npm --version

# If using nvm (Node Version Manager)
nvm install 20
nvm use 20

# Verify installation
node --version  # Should show v20.x.x or higher
npm --version   # Should show 8.x.x or higher
```

## Dependencies

- `@cucumber/cucumber` - BDD framework
- `axios` - HTTP client
- `typescript` - Type safety
- `ts-node` - TypeScript execution

## For Interviewers

### Quick Demo
```bash
# 1. Clone the repository
git clone https://github.com/taiqixp/kaluza-technical-test-stevenyu.git
cd kaluza-technical-test-stevenyu

# 2. Verify environment
node --version  # Requires >=16.0.0
npm --version   # Requires >=8.0.0

# 3. Install dependencies
npm install

# 4. Run smoke tests (safe with API limits)
npm run test:smoke

# 5. View generated report
open reports/cucumber-report-*.html
```

### Key Features to Evaluate
1. **BDD Implementation**: Readable Gherkin scenarios with comprehensive step definitions
2. **Error Handling**: Tests all major HTTP error codes (401, 402, 404, 422, 429)
3. **Internationalization**: Support for Chinese, Spanish, and special characters
4. **Professional Documentation**: Detailed README, bug reports, and code comments
5. **Real-world Scenarios**: Rate limiting, security testing, performance validation

### Code Quality Highlights
- **TypeScript**: Full type safety and modern ES6+ features
- **Modular Design**: Clean separation between API client, test steps, and utilities
- **Error Boundaries**: Graceful handling of API failures and rate limiting
- **Comprehensive Logging**: Detailed test execution feedback with timestamps

### Testing Approach
This framework demonstrates industry best practices for API testing:
- **Black-box testing** of external API endpoints
- **Boundary testing** with edge cases and invalid inputs
- **Security testing** for common vulnerabilities
- **Performance testing** with realistic expectations
- **Documentation** of found issues with professional bug reports

## Author

**Steven Yu** - QA Engineer  
📧 taiqixp@hotmail.com  
🔗 [GitHub Repository](https://github.com/taiqixp/kaluza-technical-test-stevenyu)

---

*This project was created for the Kaluza QA Engineer Technical Assessment.*

