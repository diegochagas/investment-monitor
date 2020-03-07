import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {ExecutedStrategiesSchema} from "../models/ExecutedStrategies";
import {OrderGarch} from "../../bot-garch/models/Order";

export class ServiceExecutedStrategies {

    static async getExecutedStrategies(startDate, endDate) {
        if (!startDate || !endDate) {
            throw new ApplicationResponse(400, {}, 'Error to get Executed Strategies, startDate and endDate are required');
        }

        try {
            const response = await ExecutedStrategiesSchema.find({'timeStamp': {'$gte': parseInt(startDate), '$lte': parseInt(endDate)}});
            return new ApplicationResponse<OrderGarch[]>(200, response);
        }catch(e) {
            if(e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {},'Error to get Executed Strategies')
        }
    }
}
