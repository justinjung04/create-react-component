const fs = require('fs-extra');
const path = require('path');
const { RESET, RED, GREEN } = require('./constants');

module.exports = (config, rl, component) => {
  const componentDir = path.resolve(config.path, component);
  const extension = config.typescript ? '.tsx' : '.js';
  if (fs.existsSync(componentDir)) {
    rl.write(`${RED}✗${RESET} ERROR: ${component} already exists.`);
  } else {
    fs.mkdirSync(componentDir);

    if (config.customTemplate) {
      const { basePath = 'crc-templates' } = config.custom;
      for (let dir of config.custom[config.customTemplate]) {
        try {
          fs.writeFileSync(path.resolve(componentDir, dir), require(path.resolve(basePath, dir + '.js'))(component));
        } catch(e) {
          rl.write(`${RED}✗${RESET} ERROR: ${basePath}/${dir} is missing. Either create the template or change the option in crc.config.js\n`);
          fs.removeSync(componentDir);
          return;
        }
      }
    } else {
      fs.writeFileSync(path.resolve(componentDir, `index${extension}`), require(path.resolve(__dirname, `../templates/index.js`))(component));
      fs.writeFileSync(path.resolve(componentDir, `${component}${extension}`), require(path.resolve(__dirname, `../templates/${config.component}-component.js`))(component, config.stylesheet, config.typescript));
      if (config.stylesheet !== 'none') {
        fs.writeFileSync(path.resolve(componentDir, `${component}.${config.stylesheet}`), require(path.resolve(__dirname, `../templates/style.js`))(component));
      }
      if (config.test) {
        fs.writeFileSync(path.resolve(componentDir, `${component}.test${extension}`), require(path.resolve(__dirname, `../templates/test.js`))(component));
      }
    }

    rl.write(`${GREEN}✔${RESET} ${component} is created successfully.`);
  }
  rl.write('\n');
};