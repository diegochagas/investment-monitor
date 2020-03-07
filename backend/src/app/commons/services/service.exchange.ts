import {Exchange, ExchangeSchema} from "../models/exchange/Exchange";
import {populate} from "../../../shared/helpers/populate";
import {validate} from "class-validator";
import {handleValidateError} from "../../../shared/helpers/handleValitateError";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
export class ServiceExchange {

    static async createExchange(exchange: Exchange): Promise<ApplicationResponse<Exchange>> {
        try {
            const model = populate(Exchange, exchange);
            await handleValidateError(await validate(model));

            const data = await new ExchangeSchema(model).save();
            return new ApplicationResponse<Exchange>(200, data)
        }catch(err) {
            if(err instanceof ApplicationResponse)
                throw err;
            throw new ApplicationResponse(400, {},'Error to save Exchange')
        }
    }

    static async getExchange(): Promise<ApplicationResponse<Exchange[]>> {
        try {
            const exchange = await ExchangeSchema.find({}).exec()
            return new ApplicationResponse(200,  exchange,)
        }catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get Exchanges')
        }
    }

    static async getExchangeById(id: string): Promise<ApplicationResponse<Exchange>> {
        try {
            const exchange = await ExchangeSchema.findById(id).exec();
            return new ApplicationResponse<any>(200, exchange);
        } catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get Exchange');
        }
    }

    static async updateExchange(_id: string, exchange: Exchange): Promise<ApplicationResponse<any>> {
        try {
            const model = populate(Exchange, exchange);
            await handleValidateError(await validate(model))
            const response = await ExchangeSchema.updateOne({_id}, model)
            return new ApplicationResponse(200, response)
        }catch(err) {
            if(err instanceof ApplicationResponse)
                throw err;
            throw new ApplicationResponse(400, {}, 'Error to update Exchange', )
        }
    }

    static async deleteExchange(_id: string): Promise<ApplicationResponse<any>> {

        try {
            await ExchangeSchema.deleteOne({ _id }).exec();
            return new ApplicationResponse(200, {}, 'Exhange deleted')
        }catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to delete Exchange')
        }

    };
}
