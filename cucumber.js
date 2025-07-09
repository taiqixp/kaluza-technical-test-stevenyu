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
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    paths: ['features/**/*.feature'],
    worldParameters: {
      baseUrl: 'https://api.agify.io'
    }
  }
}; 