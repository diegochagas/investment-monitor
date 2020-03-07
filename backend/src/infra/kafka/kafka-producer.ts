/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import * as kafka from 'kafkajs';
import logger from '../../shared/middlewares/winston';
import {KafkaClient} from "./kafka-client";
const prefix = 'KAFKA_PRODUCER => ';
export class KafkaProducer {
    private static instance: KafkaProducer;
    private readonly client: kafka.Kafka;
    private producer?: kafka.Producer;
    private constructor() {

        this.client = KafkaClient.getInstance().getClient();

    }

    public static getInstance(): KafkaProducer {
        if (!KafkaProducer.instance) {
            try {
                KafkaProducer.instance = new KafkaProducer();
            } catch (error) {
                logger.info('Could no initialize Kafka Producer.');
            }
        }
        return KafkaProducer.instance;
    }

    public async create(message: kafka.ProducerRecord) {
        message.acks = 0;
        logger.info(prefix + `Send message to Producer: `, message);
        try {
            this.producer = this.client.producer({
                allowAutoTopicCreation: true
            });
            await this.producer.connect();
            await this.producer.send(message);
            await this.producer.disconnect();
        }catch(e) {
            logger.error(prefix + `error send to message: ${e.message}`)
        }
    }
}
