// Generate timestamp for unique report filenames using local time
const now = new Date();
const timestamp = now.getFullYear() + '-' + 
  String(now.getMonth() + 1).padStart(2, '0') + '-' + 
  String(now.getDate()).padStart(2, '0') + 'T' + 
  String(now.getHours()).padStart(2, '0') + '-' + 
  String(now.getMinutes()).padStart(2, '0') + '-' + 
  String(now.getSeconds()).padStart(2, '0');

module.exports = {
  default: {
    require: [
      'dist/steps/**/*.js'
    ],
    format: [
      'progress-bar',
      `html:reports/cucumber-report-${timestamp}.html`,
      `json:reports/cucumber-report-${timestamp}.json`
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