const fs = require('fs');
const path = require('path');
const defaultConfig = require('../default.config');

module.exports = (cliArguments) => {
  let config = { ...defaultConfig };

  const customConfigPath = path.resolve('./crc.config.js');
  if (fs.existsSync(customConfigPath)) {
    const customConfig = require(customConfigPath);
    config = { ...defaultConfig, ...customConfig };
  }

  let isCustom = false;
  let isPath = false;

  for (let arg of cliArguments) {
    if (arg === '-n' || arg === '--normal') {
      config.component = 'normal';
    } else if (arg === '-p' || arg === '--pure') {
      config.component = 'pure';
    } else if (arg === '-f' || arg === '--function') {
      config.component = 'function';
    } else if (arg === '--javascript') {
      config.typescript = false;
    } else if (arg === '--typescript') {
      config.typescript = true;
    } else if (arg === '--css') {
      config.stylesheet = 'css';
    } else if (arg === '--less') {
      config.stylesheet = 'less';
    } else if (arg === '--sass' || arg === '--scss') {
      config.stylesheet = 'scss';
    } else if (arg === '--nocss') {
      config.stylesheet = 'none';
    } else if (arg === '--test') {
      config.test = true;
    } else if (arg === '--notest') {
      config.test = false;
    } else if (arg === '-c' || arg === '--custom') {
      isCustom = true;
    } else if (isCustom) {
      config.customTemplate = arg;
      isCustom = false;
    } else if (arg === '--path') {
      isPath = true;
    } else if (isPath) {
      config.path = arg;
      isPath = false;
    }
  }

  return config;
};