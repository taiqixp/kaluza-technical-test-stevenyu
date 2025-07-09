export const API_CONFIG = {
  BASE_URL: 'https://api.agify.io',
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  USER_AGENT: 'Kaluza-QA-Test/1.0.0'
};

export const TEST_CONFIG = {
  DEFAULT_TIMEOUT: 30000,
  MAX_RESPONSE_TIME: 5000,
  BATCH_SIZE: 10,
  RATE_LIMIT_DELAY: 100,
  PERFORMANCE_THRESHOLD: 2000
};

export const TEST_DATA = {
  SAMPLE_NAMES: {
    COMMON: ['john', 'mary', 'david', 'sarah', 'james', 'emma', 'michael', 'jennifer'],
    UNCOMMON: ['zyxwvutsrq', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'],
    INTERNATIONAL: ['josé', 'muhammad', 'wei', 'priya', 'olaf', 'björn', 'andré'],
    EDGE_CASES: ['a', 'ab', 'supercalifragilisticexpialidocious', ''],
    WITH_SPECIAL_CHARS: ['mary-jane', "o'connor", 'jean-luc', 'john123', 'test@user'],
    CASE_VARIATIONS: ['ROBERT', 'robert', 'RoBeRt', 'MARY', 'mary', 'MaRy']
  },
  COUNTRIES: ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK'],
  INVALID_INPUTS: ['', '   ', null, undefined, 123, true, false, {}, []],
  REQUIREMENTS_EXAMPLE: 'billybob' // From the technical test requirements
};

export const VALIDATION_RULES = {
  MIN_AGE: 0,
  MAX_AGE: 150,
  MIN_COUNT: 0,
  MAX_COUNT: Number.MAX_SAFE_INTEGER,
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 255,
  REQUIRED_FIELDS: ['name', 'age', 'count'],
  FIELD_TYPES: {
    name: 'string',
    age: 'number',
    count: 'number'
  }
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

export const ERROR_MESSAGES = {
  API_NOT_AVAILABLE: 'API is not available',
  INVALID_NAME: 'Invalid name parameter',
  MISSING_NAME: 'Missing name parameter',
  TIMEOUT: 'Request timeout',
  NETWORK_ERROR: 'Network error',
  UNEXPECTED_RESPONSE: 'Unexpected response format',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded'
};

export const REPORT_CONFIG = {
  HTML_REPORT_PATH: 'reports/cucumber-report.html',
  JSON_REPORT_PATH: 'reports/cucumber-report.json',
  SCREENSHOTS_PATH: 'reports/screenshots',
  LOGS_PATH: 'reports/logs'
};

export const FEATURE_TAGS = {
  SMOKE: '@smoke',
  POSITIVE: '@positive',
  NEGATIVE: '@negative',
  EDGE_CASE: '@edge-case',
  PERFORMANCE: '@performance',
  RELIABILITY: '@reliability',
  LOCALIZATION: '@localization',
  DATA_VALIDATION: '@data-validation',
  API_LIMITS: '@api-limits',
  ADVANCED: '@advanced'
}; 