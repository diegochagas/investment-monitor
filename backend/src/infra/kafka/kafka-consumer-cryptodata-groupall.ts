import {Topic, TopicSchema} from "../../app/commons/models/topic/Topic";
import logger from "../../shared/middlewares/winston";
import  * as kafka from 'kafkajs';
import {WSServer} from "../ws/ws-service";
import {KafkaClient} from "./kafka-client";

const prefix = `KAFKA_CONSUMER_CRYPTODATA_GROUPALL => `;

export class KafkaConsumerCryptodataGroupall {

    private static instance: KafkaConsumerCryptodataGroupall;
    private readonly client: kafka.Kafka;
    private topics: Topic[] = [];
    private consumer?: kafka.Consumer;
    private contents = {};

    private constructor() {
        this.client =  KafkaClient.getInstance().getClient();
        this.createConsumer();
    }

    private createConsumer() {
        this.consumer = this.client.consumer({
            groupId: `group_cryptodata_groupall`,
            allowAutoTopicCreation: true,
        });
    }

    static getInstance() {
        if (!KafkaConsumerCryptodataGroupall.instance) {
            KafkaConsumerCryptodataGroupall.instance = new KafkaConsumerCryptodataGroupall();
        }
        return KafkaConsumerCryptodataGroupall.instance
    }

    public async init() {
        await this.getTopics();
        await this.connectConsumers()

    }

    private async getTopics() {
        this.topics = await TopicSchema.find({group: 'ALL'});
    }

    private getConsumers() {
        return this.topics.map(topic => ({
            topic: `${topic.name}${topic.type ? `_${topic.type}` : ''}`.toUpperCase(),
        }));
    }

    private async connectConsumers() {
        logger.info(prefix + `connect to consumers`);
        const consumers = this.getConsumers();
        if(consumers.length > 0) {
            await (<kafka.Consumer>this.consumer).connect();
            for(let topic of this.getConsumers()) {
                logger.info(prefix + `connecting to topic`, topic);
                await (<kafka.Consumer>this.consumer).subscribe(topic)
            }
            await this.run();

            return;
        } else {
            logger.warn(prefix + `0 topics to connect`)
        }


    }

    private async run() {
        return await (<kafka.Consumer>this.consumer).run({
            autoCommit: true,
            eachMessage: async ({ topic, partition, message }) => {
                logger.debug(prefix + `Message received on topic ${topic}:`, JSON.parse(message.value.toString()));
                const content = JSON.parse(message.value.toString());
                content['exchange'] = content.subscribe.split('_')[1];
                this.contents[topic] = content;
                logger.debug(prefix + `sending to socket`, this.contents);
                WSServer.getInstance().send(this.contents, `COIN_API_ALL`);
                WSServer.getInstance().send(JSON.parse(message.value.toString()), topic);
            }
        });
    }

    public async addTopics() {
        const aux = await TopicSchema.find({group: 'ALL'});
        if (aux.length === 0) {
            logger.info(prefix + `0 topics founded, disconecting...`);
            try {
                this.topics = aux;
                await (<kafka.Consumer>this.consumer).stop();
                await (<kafka.Consumer>this.consumer).disconnect();
                logger.info(prefix + `Consumer diconnected`);
            }catch(e) {
                logger.error(prefix + `error to disconnect: ${e.message}`)
            }

        } else if (JSON.stringify(this.topics) !== JSON.stringify(aux)) {
            this.topics = aux;
            logger.info(prefix + `topics modify, reconecting...`);
            try {
                await (<kafka.Consumer>this.consumer).stop();
                await (<kafka.Consumer>this.consumer).disconnect();
            }catch(e) {
                logger.error(prefix + `error to disconnect new consumers: ${e.message}`)
            }

            try {
                this.createConsumer();
                await this.connectConsumers();
            }catch(e) {
                logger.error(prefix + `error to reconnect new consumers: ${e.message}`)
            }

        } else logger.info(prefix + `Do not need to reconnect`)
    }
}
