import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import logger from "../../../shared/middlewares/winston";
import {SecretKey, SecretManagerService} from "../lib/SecretManagerService";

export class ServiceSecretKeys {

    static async save(secret: SecretKey): Promise<ApplicationResponse<any>> {
        try {
            const response = await SecretManagerService.getInstance()
                .createSecret(secret);
            logger.info(`ServiceSecretKeys::save::Success`);
            return new ApplicationResponse(200, response, `Success, your secret key are being created`);
        } catch(e) {
            logger.error(`ServiceSecretKeys::save::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, `Error to save sacret: ${e.message}`);
        }
    }

    static async get(secretId: string): Promise<ApplicationResponse<any>> {
        try {
            logger.info(`ServiceSecretKeys::get::secretId: ${secretId}`);
            const response = await SecretManagerService.getInstance()
                .getSecret(secretId);
            return new ApplicationResponse(200, response);
        }catch(e) {
            logger.error(`ServiceSecretKeys::get::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, `Error to get sacret: ${e.message}`);
        }
    }

    static async update(secret: SecretKey): Promise<ApplicationResponse<any>> {
        try {
            const response = await SecretManagerService.getInstance()
                .updateSecret(secret);
            return new ApplicationResponse(200, response, `Success, your secret key are being updated`);
        } catch(e) {
            logger.error(`ServiceSecretKeys::update::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, `Error to update sacret: ${e.message}`);
        }
    }

    static async delete(secretId: string): Promise<ApplicationResponse<any>> {
        try {
            const response = await SecretManagerService.getInstance()
                .deleteSecret(secretId);
            return new ApplicationResponse(200, response);
        }catch(e) {
            logger.error(`ServiceSecretKeys::delete::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, `Error to delete sacret: ${e.message}`);
        }
    }

}
