import {ServiceInstance} from "../../app/commons/services/service.instance";
import logger from "./winston";
import {KafkaConsumerCryptodataGroupall} from "../../infra/kafka/kafka-consumer-cryptodata-groupall";
import {KafkaConsumerCryptoData} from "../../infra/kafka/kafka-consumer-crypto-data";

const cron = require('node-cron');

logger.info('Initialize cron');

cron.schedule('* * * * *', () => {
    logger.info('**validating status instances**');
    new ServiceInstance().validateStatusInstance();
});

cron.schedule('* * * * *', () => {
    if (process.env.NODE_ENV !== 'local') {
        logger.info('**validating cryptodata topics**');
        KafkaConsumerCryptodataGroupall.getInstance().addTopics();
        KafkaConsumerCryptoData.getInstance().addTopics();
    }
});
