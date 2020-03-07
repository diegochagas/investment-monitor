import * as kafka from 'kafkajs';
import {WSServer} from '../ws/ws-service';
import {BotEventsStatusHandler} from '../../app/commons/kafka-handlers/bot-events-status-handler';
import {BotEventsOrderHandler} from '../../app/commons/kafka-handlers/bot-events-order-handler';
import {BotEventsIndicatorHandler} from '../../app/commons/kafka-handlers/bot-events-indicator-handler';
import {TopicConsumers} from '../../shared/models/enum/Topic';
import logger from '../../shared/middlewares/winston';
import {IKafkaMessage} from "../../shared/models/interface/IKafkaMessage";
import {KafkaClient} from "./kafka-client";
const prefix = 'KAFKA_CONSUMER_BOTS => ';
const webSocket = WSServer.getInstance();
const actions = {
    'STATUS': new BotEventsStatusHandler(),
    'ORDERS': new BotEventsOrderHandler(),
    'INDICATORS': new BotEventsIndicatorHandler()
};

const consumers = Object.keys(TopicConsumers)
    .map(key => ({
        topic: TopicConsumers[key],
    }));

export class KafkaConsumerBotEventsQueue {
    private static instance: KafkaConsumerBotEventsQueue;
    private readonly client: kafka.Kafka;

    private constructor() {
        this.client =  KafkaClient.getInstance().getClient();
    }
    static getInstance() {
        if(!KafkaConsumerBotEventsQueue.instance)
            KafkaConsumerBotEventsQueue.instance = new KafkaConsumerBotEventsQueue();
        return KafkaConsumerBotEventsQueue.instance;
    }

    public async init() {
        await this.connectConsumers();
    }

    private async connectConsumers() {
        logger.info(`${prefix} Connect to consumers`);
        const consumer = this.client.consumer({
            groupId: `group_bot_events`,
            allowAutoTopicCreation: true,
        });

        for(let topic of consumers) {
            logger.info(prefix + `connecting to topic`, topic);
            await consumer.subscribe(topic);
        }
        await consumer.run({
            autoCommit: true,
            eachMessage: async ({ topic, partition, message }) => {
                logger.info(`${prefix} Message received on topic ${topic}:`, JSON.parse(message.value.toString()));
                try {
                    const msg: IKafkaMessage = JSON.parse(message.value.toString());
                    actions[msg.action].send(topic, msg, msg.content, webSocket);
                } catch (error) {
                    console.error(prefix + 'error to process message => ', error);
                    logger.error(prefix +'error to process message =>', error)
                }
            }
        });
    };
}
