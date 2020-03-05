const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const yaml = require('js-yaml');
const envs = (yaml.safeLoad(fs.readFileSync('env.yml', 'utf8')))[argv.stage];
fs.writeFileSync('env.json', JSON.stringify(envs), { encoding: 'utf8' });
