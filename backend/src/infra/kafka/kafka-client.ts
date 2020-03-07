/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import * as kafka from 'kafkajs';
export class KafkaClient {

    private static instance: KafkaClient;
    private readonly client: kafka.Kafka;

    private constructor() {
        this.client = new kafka.Kafka({
            clientId: `InvestmentBackoffice`,
            brokers: (process.env.KAFKA_HOST as string).split(','),
            logLevel: kafka.logLevel.ERROR
        });
    }

    static getInstance() {
        if(!KafkaClient.instance)
            KafkaClient.instance = new KafkaClient();
        return KafkaClient.instance
    }

    getClient(): kafka.Kafka {
        return this.client;
    }
}
