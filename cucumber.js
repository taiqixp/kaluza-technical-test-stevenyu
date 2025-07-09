module.exports = {
  default: {
    require: [
      'ts-node/register',
      'src/steps/**/*.ts'
    ],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    dryRun: false,
    failFast: false,
    paths: ['features/agify-api-main.feature'],
    worldParameters: {
      baseUrl: 'https://api.agify.io'
    }
  }
}; 