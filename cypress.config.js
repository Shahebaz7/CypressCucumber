const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const fs = require('fs');

// Load custom environment config
function getEnvConfig(envName) {
  const path = `./cypress/config/${envName}.json`;
  return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {};
}

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/api/*.feature",
    supportFile: "cypress/support/e2e.js",
    baseUrl: 'http://dummy-url.com',

    async setupNodeEvents(on, config) {
      console.log('🔧 Cypress setup started...');

      // Load env-specific config
      const envName = config.env.ENV || 'dev';
      const envConfig = getEnvConfig(envName);

      // Merge env config
      config.env = {
        ...config.env,
        ...envConfig,
      };

      // Set dynamic baseUrl
      config.baseUrl = envConfig.baseUrl || config.baseUrl;

      // Allure + Cucumber + Esbuild plugins
      await addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      return config;
    }
  },
  env: {
    ENV: 'dev', // default environment
    TAGS: "",
    allure: true,
  }
});