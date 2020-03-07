import {TopicSchema, TOPIC_QUEUE} from "../../app/commons/models/topic/Topic";
import logger from "../../shared/middlewares/winston";
import {IKafkaMessage} from "../../shared/models/interface/IKafkaMessage";
import * as kafka from 'kafkajs'
import {KafkaClient} from "./kafka-client";

const prefix = 'KAFKA_CONSUMER_CREATE_TOPICS => ';

export class KafkaConsumerCreateTopic {

    private static instance: KafkaConsumerCreateTopic;
    private admin?: kafka.Admin;
    private readonly client: kafka.Kafka;

    private constructor() {
        this.client =  KafkaClient.getInstance().getClient();
    }

    public static getInstance() {
        logger.info(prefix + 'starting consumer.');
        if (!KafkaConsumerCreateTopic.instance) {
            KafkaConsumerCreateTopic.instance = new KafkaConsumerCreateTopic()
        }
        return KafkaConsumerCreateTopic.instance
    }

    public async init() {
        await this.connectConsumers();
    }

    private async createTopic(topic) {

        this.admin = this.client.admin();
        await this.admin.connect();
        try {
            logger.info(`${prefix} Verifying topic exist on kafka....`);
            await this.admin.fetchTopicMetadata({
                topics: [topic]
            });
            logger.info(`${prefix} Topic ${topic} already exist`);
            await this.admin.disconnect();
        } catch (err) {
            try {
                logger.info(`${prefix} Topic ${topic} doest not exist, creating...`);
                await this.admin.createTopics({
                    topics: [
                        {
                            topic,
                            numPartitions: 1,
                            replicationFactor: 1
                        }
                    ]
                });
                logger.info(`${prefix} Topic ${topic} created`);
                await this.admin.disconnect();
            } catch (e) {
                logger.error(`${prefix} Error to create topic: ${e.message}`);
            }
        }
    }

    private async connectConsumers() {
        const consumer = this.client.consumer({
            groupId: `group_create-topics`,
            allowAutoTopicCreation: true
        });

        await consumer.connect();
        await consumer.subscribe({
            topic: TOPIC_QUEUE
        });
        await consumer.run({
            autoCommit: true,
            eachMessage: async ({topic, partition, message}) => {
                logger.info(`${prefix} Message received on topic ${topic}: `, JSON.parse(message.value.toString()));
                const msg: IKafkaMessage = JSON.parse(message.value.toString());
                TopicSchema.findOneAndUpdate({name: (msg.content as string).toUpperCase()}, {name: (msg.content as string).toUpperCase()}, {
                    upsert: true,
                    new: true
                })
                    .then(async topic => {
                        logger.info(`${prefix} topic created on database=>`, topic);
                        await this.createTopic(msg.content)
                    })
                    .catch(err => logger.error(`${prefix} - topic error =>`, err))
            }
        });
    }
}
