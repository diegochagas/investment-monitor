import {populate} from "../../../shared/helpers/populate";
import {validate} from "class-validator";
import {handleValidateError} from "../../../shared/helpers/handleValitateError";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {ExchangeAlias, ExchangeAliasSchema} from "../models/exchange/ExchangeAlias";
export class ServiceExchangeAlias {

    static async createExchangeAlias(alias: ExchangeAlias): Promise<ApplicationResponse<ExchangeAlias>> {
        try {
            const model = populate(ExchangeAlias, alias);
            await handleValidateError(await validate(model));

            const data = await new ExchangeAliasSchema(model).save();
            return new ApplicationResponse<ExchangeAlias>(200, data)
        }catch(err) {
            if(err instanceof ApplicationResponse)
                throw err;
            throw new ApplicationResponse(400, {},'Error to save ExchangeAlias')
        }
    }

    static async getExchangeAlias(): Promise<ApplicationResponse<ExchangeAlias[]>> {
        try {
            const alias = await ExchangeAliasSchema.find({}).exec()
            return new ApplicationResponse(200,  alias,)
        }catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get ExchangeAliass')
        }
    }

    static async getExchangeAliasById(id: string): Promise<ApplicationResponse<ExchangeAlias>> {
        try {
            const alias = await ExchangeAliasSchema.findById(id).exec();
            return new ApplicationResponse<any>(200, alias);
        } catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get ExchangeAlias');
        }
    }

    static async getExchangeAliasByExchangeId(id: string): Promise<ApplicationResponse<ExchangeAlias>> {
        try {
            const alias = await ExchangeAliasSchema.find({ exchangeId: id }).exec();
            return new ApplicationResponse<any>(200, alias);
        } catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get ExchangeAlias');
        }
    }

    static async updateExchangeAlias(_id: string, alias: ExchangeAlias): Promise<ApplicationResponse<any>> {
        try {
            const model = populate(ExchangeAlias, alias);
            await handleValidateError(await validate(model))
            const response = await ExchangeAliasSchema.updateOne({_id}, model)
            return new ApplicationResponse(200, response)
        }catch(err) {
            if(err instanceof ApplicationResponse)
                throw err;
            throw new ApplicationResponse(400, {}, 'Error to update ExchangeAlias', )
        }
    }

    static async deleteExchangeAlias(_id: string): Promise<ApplicationResponse<any>> {

        try {
            await ExchangeAliasSchema.deleteOne({ _id }).exec();
            return new ApplicationResponse(200, {}, 'Exhange deleted')
        }catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to delete ExchangeAlias')
        }

    };
}
