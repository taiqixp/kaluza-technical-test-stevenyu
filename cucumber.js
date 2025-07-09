module.exports = {
  default: {
    require: [
      'ts-node/register',
      'dist/steps/**/*.js'
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
    paths: ['features/**/*.feature'],
    worldParameters: {
      baseUrl: 'https://api.agify.io'
    }
  }
}; 