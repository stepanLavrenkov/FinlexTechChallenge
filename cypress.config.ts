import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    supportFile: false,
    async setupNodeEvents(on, config) {
      const configName = config.env.configFile || 'production';
      const fileConfig = await getConfigurationFromFile(configName);
      config.video = false;
      config.supportFile = 'cypress/support/e2e.ts';
      config.experimentalSessionAndOrigin = true;

      _.merge(config, fileConfig);

      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
          target: 'ES6',
          tsconfig: 'cypress/tsconfig.json'
        })
      );

      return config;
    }
  }
});

async function getConfigurationFromFile(fileName: string): Promise<Cypress.PluginConfigOptions> {
  const pathToConfigFile = path.resolve('cypress', 'config', `${fileName}.json`);

  return fs.readJSONSync(pathToConfigFile) as unknown as Cypress.PluginConfigOptions;
}
