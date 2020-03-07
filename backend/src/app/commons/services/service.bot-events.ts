import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import logger from "../../../shared/middlewares/winston";
import {BotEventsSchema} from "../models/bot-events/BotEvents";
import {Project} from "../../../shared/models/enum/projectName";

const prefix = `ServiceBotEvents => `;
export class ServiceBotEvents {

    static getEvent = async ( project: string, query) => {
        try {
            const type = `${query.type}_${Project[project]}_${query.instance}`.toUpperCase();
            logger.info(prefix + `Searching for key: ${type}`);
            const response = await BotEventsSchema.findOne({ type });
            return new ApplicationResponse<any>(200, response);
        }catch(e) {
            logger.error(prefix + e.message);
            return new ApplicationResponse<any[]>(400, [], 'Não foi possível obter os dados.');
        }
    }

}
