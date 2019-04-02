#!/usr/bin/env node

const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');

const createComponent = require('./createComponent');
const getConfig = require('./getConfig');
const { RESET, BOLD, helpMessage } = require('./constants');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (process.argv[2] === '-v' || process.argv[2] === '--version') {
  rl.write(require(path.resolve(__dirname, '../package.json')).version);
  rl.write('\n');
  rl.close();
  return;
} else if (process.argv[2] === '-h' || process.argv[2] === '--help') {
  rl.write(helpMessage);
  rl.write('\n');
  rl.close();
  return;
}

const config = getConfig(process.argv.slice(2));

let question = 'Component name(s):';
if (config.component === 'pure') {
  question = 'Pure component name(s):';
} else if (config.component === 'function') {
  question = 'Function component name(s):';
}

rl.question(`${BOLD}${question} ${RESET}`, component => {
  config.path.split('/').reduce((acc, cur) => {
    const dir = path.resolve(acc + '/' + cur);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    return acc + '/' + cur;
  }, '.');

  rl.write('\n');

  if (component.includes(',')) {
    component.split(',').forEach(component => {
      createComponent(config, rl, component.trim());
    });
  } else {
    createComponent(config, rl, component.trim());
  }

  rl.write('\n');
  rl.close();
});