"use strict";
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var yaml = require('js-yaml');
var envs = (yaml.safeLoad(fs.readFileSync('env.yml', 'utf8')))[argv.stage];
fs.writeFileSync('env.json', JSON.stringify(envs), { encoding: 'utf8' });
//# sourceMappingURL=yml2json.js.map