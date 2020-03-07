import {IWsKafka} from "../../../shared/models/interface/IWsKafka";
import {WSServer} from "../../../infra/ws/ws-service";
import {RoomDashboard} from "../../../shared/models/enum/area.en";
import logger from "../../../shared/middlewares/winston";
import {IKafkaMessage} from "../../../shared/models/interface/IKafkaMessage";
import {BotEventsSchema} from "../models/bot-events/BotEvents";

const prefix = 'BOT_EVENTS_ORDER_HANDLER => ';

export class BotEventsOrderHandler implements IWsKafka<any> {

    send(topic: string, message: IKafkaMessage, data: any, webSocket: WSServer): void {
        logger.info(prefix+'processing Order method from kafka message');
        logger.info(prefix + 'message from: ' + message.type);
        const order = {
            type: `${message.action}_${message.type}_${message.instance}`.toUpperCase(),
            data
        };
        BotEventsSchema.findOneAndUpdate({ type: order.type }, order, {upsert: true, new: true}).then(() => {
            logger.info(prefix+`Last message saved with key: ${order.type}`, order)
        });
        webSocket.send({ type: 'order', ...data} , `${RoomDashboard[message.type as string]}-${message.instance}`)
    }

}
