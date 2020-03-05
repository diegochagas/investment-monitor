"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var yaml = require('js-yaml');
var envs = (yaml.safeLoad(fs.readFileSync('env.yml', 'utf8')))[argv.stage];
var AWS = require('aws-sdk');
console.log("build to " + argv.stage + " environment");
if (argv.stage === 'local' || argv.stage === 'docker') {
    console.log('Generate .env file');
    var str = Object.keys(envs)
        .reduce(function (total, current) { return "" + total + current + "=" + envs[current] + "\n"; }, '');
    fs.writeFileSync('.env', str);
}
else {
    var accessKeyId = process.env.SecretsManager_AwsKey;
    var secretAccessKey = process.env.SecretsManager_AwsSecret;
    var region = process.env.SecretsManager_AwsRegion;
    var SecretId_1 = process.env.SecretsManager_Name;
    console.log('AWS', { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region, SecretId: SecretId_1 });
    if (secretAccessKey && accessKeyId) {
        AWS.config.update({
            credentials: {
                accessKeyId: accessKeyId ? accessKeyId : 'AKIAJZID3KFRCXXCAQ4Q',
                secretAccessKey: secretAccessKey ? secretAccessKey : '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'
            },
        });
    }
    AWS.config.update({ region: region ? region : 'us-west-2' });
    var secretManager = new AWS.SecretsManager();
    secretManager.getSecretValue({
        SecretId: SecretId_1 ? SecretId_1 : 'investment.backoffice.dev'
    }, function (error, data) {
        var environements;
        if (error)
            throw error.message;
        else {
            if (data.SecretString !== undefined) {
                console.log('data.SecretString founded');
                environements = JSON.parse(data.SecretString);
            }
            else {
                if (data.SecretBinary === undefined)
                    throw 'Secret binary not found';
                console.log('data.SecretBinary founded');
                var buff = new Buffer(data.SecretBinary.toString(), "base64");
                var decodedBinarySecret = buff.toString("ascii");
                environements = JSON.parse(decodedBinarySecret);
            }
        }
        environements['AWS_ACCESS_KEY'] = process.env.SecretsManager_AwsKey;
        environements['AWS_SECRET_ACCESS_KEY'] = process.env.SecretsManager_AwsSecret;
        var str = Object.keys(environements)
            .reduce(function (total, current) {
            var _a;
            return (__assign((_a = {}, _a[current] = environements[current], _a), total));
        }, {});
        console.log('Generate ecosystem.config.js file', str);
        fs.writeFileSync('ecosystem.config.js', "\n        module.exports = {\n          apps : [{\n            name: '" + (SecretId_1 ? SecretId_1 : 'investment.backoffice.dev') + "',\n            script: './build/src/index.js',\n            args: '',\n            watch: false,\n            env: " + JSON.stringify(str) + ",\n            env_production: {\n              NODE_ENV: 'production'\n            }\n          }],\n        };\n    ");
    });
}
//# sourceMappingURL=build.js.map