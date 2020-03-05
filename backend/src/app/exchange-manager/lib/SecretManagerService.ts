import * as AWS from 'aws-sdk';

export class SecretManagerService {

    private readonly client: AWS.SecretsManager;
    private static instance: SecretManagerService;

    private constructor() {
        AWS.config.update({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
            },
            region: 'us-west-2'
        });
        this.client = new AWS.SecretsManager();
    }

    static getInstance(): SecretManagerService {
        if (!SecretManagerService.instance)
            SecretManagerService.instance = new SecretManagerService();
        return SecretManagerService.instance
    }

    public async createSecret(secret: SecretKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.createSecret({
                Name: secret.name,
                Description: secret.description ? secret.description : '',
                SecretString: JSON.stringify(secret.value)
            }, (e, data) => {
                if (e)
                    reject(e);
                else resolve(data)
            })
        })
    }

    public async updateSecret(secret: SecretKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.updateSecret({
                SecretId: secret.name,
                Description: secret.description ? secret.description : '',
                SecretString: JSON.stringify(secret.value)
            }, (e, data) => {
                if (e)
                    reject(e);
                else resolve(data)
            })
        })
    }

    public async deleteSecret(secretId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.deleteSecret({
                SecretId: secretId,
                ForceDeleteWithoutRecovery: true
            }, (e, data) => {
                if (e)
                    reject(e);
                else resolve(data)
            })
        });
    }

    public async getSecret(secretId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.getSecretValue({
                SecretId: secretId
            }, (error, data) => {
                if (error) reject(error);
                else {
                    if (data.SecretString !== undefined) {
                        resolve(JSON.parse(data.SecretString));
                    } else {
                        if (data.SecretBinary === undefined) reject({message: 'Secret binary not found'});
                        else {
                            const buff = new Buffer(
                                data.SecretBinary.toString(),
                                "base64"
                            );
                            const decodedBinarySecret = buff.toString("ascii");
                            resolve(JSON.parse(decodedBinarySecret));
                        }
                    }
                }
            })
        });
    }
}

export interface SecretKey {
    name: string,
    description?: string,
    value: {
        key: string,
        secret: string
    }[]
}
