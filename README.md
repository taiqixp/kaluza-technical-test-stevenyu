# Agify.io API Testing Task

Dear Sir/Madam,

I'm writing to confirm that I've completed the QA Engineer technical test for Kaluza.

The API testing framework has been developed using BDD principles and thoroughly tested based on the task requirements.

**Project Summary:**
- **GitHub repository:** https://github.com/taiqixp/kaluza-technical-test-stevenyu.git
- **Test results:** 38 scenarios passed, 152 steps executed
- **HTML test report:** Available in the /reports folder
- **Bug report:** Documented in BUG_REPORT.md
- **Coverage includes:** positive/negative cases, edge cases, performance, and data validation

Please feel free to review the project and let me know if you need anything else.
Thank you for the opportunity — I look forward to hearing your feedback.

## Project Overview

This project tests the agify.io API which predicts age based on names. The API returns JSON with `name`, `age`, and `count` fields.

For this interview assessment, which focuses on testing a single parameter, and considering the 100 requests per day API limit, I've included only basic test scenarios for the country_id parameter.


**API Details:**
- Base URL: `https://api.agify.io`
- Example: `https://api.agify.io?name=billybob` → `{"count":67,"name":"billybob","age":60}`
- Free limit: 100 requests per day


## Prerequisites

**Environment Requirements:**
- **Node.js**: >=16.0.0
- **npm**: >=8.0.0

**Check your versions:**
```bash
node --version  # Should be 16.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

## Quick Start
Follow the **Quick Start** section above, then:

```bash
# Clone the repository
git clone https://github.com/taiqixp/kaluza-technical-test-stevenyu.git
cd kaluza-technical-test-stevenyu

# Install dependencies
npm install

# Run all tests
npm test

# Run smoke tests only (uses fewer API calls)
npm run test:smoke

# View generated report
open reports/cucumber-report-*.html
```

## Test Scenarios

**Total: 38 test scenarios** covering:
- ✅ **Smoke Tests** - Core functionality including required 'billybob' test
- ✅ **Positive Tests** - Various name combinations, case sensitivity, special characters
- ✅ **Edge Cases** - Short names, empty parameters, numbers, spaces
- ✅ **Security Tests** - XSS and SQL injection prevention
- ✅ **Localization Tests** - Country-specific responses (US, AU, CA, GB)
- ✅ **Error Handling** - API error codes (401, 402, 404, 422, 429)
- ✅ **Performance Tests** - Response time validation
- ✅ **Batch Processing** - Multiple names in single request

## Available Commands

```bash
npm test              # Run all tests
npm run test:smoke    # Run smoke tests (3 API calls)
npm run test:positive # Run positive tests
npm run test:edge     # Run edge cases
npm run test:security # Run security tests
```

## Test Reports

After running tests, reports are generated in the `reports/` directory:
- `cucumber-report-*.html` - Detailed HTML report (open in browser)
- `cucumber-report-*.json` - Machine-readable JSON report

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


## For Interviewers

## Author
**Steven Yu** - QA Engineer  
📧 taiqixp@hotmail.com  
*This project was created by Steven for the Kaluza QA Engineer Technical Assessment.*

