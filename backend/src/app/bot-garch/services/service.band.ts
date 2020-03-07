import {TradeWindow} from "../../strategy/models/strategy/configs/GarchConfig";
import {connectToTopicPersistentDB} from "../../../shared/db/db-topic-persistent";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import logger from "../../../shared/middlewares/winston";

const prefix = `SERVICE_BAND => `;

export class ServiceBand {

    static async getBand(band: TradeWindow, query: { dtIni: string, dtFim: string, exchange?: string }) {
        try {
            const exchange = query.exchange ? `_${query.exchange}`.toUpperCase() : '';
            logger.info(prefix + `exchange: ${exchange}`);
            const condition = (query.dtFim && query.dtIni) ? {$and: [{t: {$gte: parseInt(query.dtIni)}}, {t: {$lte: parseInt(query.dtFim)}}]} : {};
            const connection = connectToTopicPersistentDB();
            const response = await connection.db.collection(`IDXAIGARCH${band}${exchange}_VOL`)
                .find(condition);

            return new ApplicationResponse(200, await response.toArray());
        } catch (e) {
            if (e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to get bands')
        }

    }
}
