/* eslint-disable @typescript-eslint/no-var-requires */
const cucumber = require('cypress-cucumber-preprocessor').default;
const browserify = require('@cypress/browserify-preprocessor');
const sqlServer = require('cypress-sql-server');
const deepmerge = require('deepmerge');
const path = require('path');
const pathmodify = require('pathmodify');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = (on, config) => {
  allureWriter(on, config);

  // Cucumber uses browserify
  const cucumberOptions = browserify.defaultOptions;

  cucumberOptions.browserifyOptions.plugin.unshift([
    'pathmodify',
    {
      mods: [
        function (rec) {
          const prefix = '~/';
          const name = rec.id;

          if (!name.includes(prefix)) {
            return name;
          }

          return {
            id: path.join(__dirname, '../integration', name.substr(prefix.length)),
          };
        },
      ],
    },
  ]);

  cucumberOptions.browserifyOptions.plugin.unshift([
    'tsify',
    { project: path.join(config.projectRoot, 'tsconfig.json') },
  ]);

  const tasks = sqlServer.loadDBPlugin({ ...config.env.erpdbconfig, ...config.env.erpdbconfig_options });
  on('task', tasks);
  on('file:preprocessor', cucumber(cucumberOptions));

  const configJson = require(config.configFile);
  if (configJson.extends) {
    const baseConfigFilename = path.join(config.projectRoot, configJson.extends);
    const baseConfig = require(baseConfigFilename);
    return deepmerge(baseConfig, configJson);
  }

  return config;
};
