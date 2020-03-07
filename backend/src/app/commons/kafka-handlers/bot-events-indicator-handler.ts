import {IWsKafka} from "../../../shared/models/interface/IWsKafka";
import {WSServer} from "../../../infra/ws/ws-service";
import {RoomDashboard} from "../../../shared/models/enum/area.en";
import logger from "../../../shared/middlewares/winston";
import {IKafkaMessage} from "../../../shared/models/interface/IKafkaMessage";
import {BotEventsSchema} from "../models/bot-events/BotEvents";

const prefix = 'BOT_EVENTS_INDICATOR_HANDLER => ';
export class BotEventsIndicatorHandler implements IWsKafka<any> {

    send(topic: string, message: IKafkaMessage, data: any, webSocket: WSServer): void {
        logger.info(prefix+'processing Indicator method from kafka message');
        logger.info(prefix + 'message from: ' + message.type);
        const indicator = {
            type: `${message.action}_${message.type}_${message.instance}`.toUpperCase(),
            data
        };
        BotEventsSchema.findOneAndUpdate({ type: indicator.type }, indicator, {upsert: true, new: true}).then(() => {
            logger.info(prefix+`Last message saved with key: ${indicator.type} => `, indicator)
        });
        webSocket.send({ type: 'indicator', ...data }, `${RoomDashboard[message.type as string]}-${message.instance}` );
    }

}
