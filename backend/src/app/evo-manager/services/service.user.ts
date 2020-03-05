import {User, UserSchema} from "../models/user";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {populate} from "../../../shared/helpers/populate";
import {handleValidateError} from "../../../shared/helpers/handleValitateError";
import {validate} from "class-validator";
import logger from '../../../shared/middlewares/winston';

export class ServiceUser {

    static async save(data: User): Promise<ApplicationResponse<User>> {
        try {
            const model = populate(User, data);
            await handleValidateError(await validate(model));

            const response = await new UserSchema(model).save();
            return new ApplicationResponse(200, response);

        }catch(e) {
            logger.error(`ServiceUser::save::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, 'Error to save user');
        }
    }

    static async getAll(): Promise<ApplicationResponse<User[]>> {
        try {
            const response = await UserSchema.find().exec();
            return new ApplicationResponse(200, response)
        }catch(e) {
            logger.error(`ServiceUser::getAll::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, 'Error to get users');
        }
    }

    static async getById(id: string): Promise<ApplicationResponse<User>> {
        try {
            const response = await UserSchema.findById(id).exec();
            return new ApplicationResponse(200, response!);
        }catch(e) {
            logger.error(`ServiceUser::getById::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, 'Error to get user');
        }
    }
}
