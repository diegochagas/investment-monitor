const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const yaml = require('js-yaml');
const envs = (yaml.safeLoad(fs.readFileSync('env.yml', 'utf8')))[argv.stage]
const AWS = require('aws-sdk');
console.log(`build to ${argv.stage} environment`);

if (argv.stage === 'local' || argv.stage === 'docker') {
    console.log('Generate .env file');
    const str = Object.keys(envs)
        .reduce((total, current) => `${total}${current}=${envs[current]}\n`, '');
    fs.writeFileSync('.env', str);

} else {

    const accessKeyId = process.env.SecretsManager_AwsKey;
    const secretAccessKey = process.env.SecretsManager_AwsSecret;
    const region = process.env.SecretsManager_AwsRegion;
    const SecretId = process.env.SecretsManager_Name;

    console.log('AWS', {accessKeyId, secretAccessKey, region, SecretId});

    if (secretAccessKey && accessKeyId) {
        AWS.config.update({
            credentials: {
                accessKeyId: accessKeyId ? accessKeyId : 'AKIAJZID3KFRCXXCAQ4Q',
                secretAccessKey: secretAccessKey ? secretAccessKey : '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'
            },
        });
    }
    AWS.config.update({ region: region ? region : 'us-west-2' });
    const secretManager = new AWS.SecretsManager();
    secretManager.getSecretValue({
        SecretId: SecretId ? SecretId : 'investment.backoffice.dev'
    }, (error, data) => {
        let environements;
        if (error) throw error.message
        else {
            if (data.SecretString !== undefined) {
                console.log('data.SecretString founded')
                environements = JSON.parse(data.SecretString);
            } else {
                if (data.SecretBinary === undefined) throw 'Secret binary not found';
                console.log('data.SecretBinary founded')
                const buff = new Buffer(
                    data.SecretBinary.toString(),
                    "base64"
                );
                const decodedBinarySecret = buff.toString("ascii");
                environements = JSON.parse(decodedBinarySecret);
            }
        }

        environements['AWS_ACCESS_KEY'] = process.env.SecretsManager_AwsKey;
        environements['AWS_SECRET_ACCESS_KEY'] = process.env.SecretsManager_AwsSecret;

        const str = Object.keys(environements)
            .reduce((total, current) => ({[current]: environements[current], ...total}), {});
        console.log('Generate ecosystem.config.js file', str);
        fs.writeFileSync('ecosystem.config.js', `
        module.exports = {
          apps : [{
            name: '${SecretId ? SecretId : 'investment.backoffice.dev'}',
            script: './build/src/index.js',
            args: '',
            watch: false,
            env: ${JSON.stringify(str)},
            env_production: {
              NODE_ENV: 'production'
            }
          }],
        };
    `);
    });

}
