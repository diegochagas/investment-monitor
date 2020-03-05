"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var service_instance_1 = require("../../app/commons/services/service.instance");
var winston_1 = __importDefault(require("./winston"));
var kafka_consumer_cryptodata_groupall_1 = require("../../infra/kafka/kafka-consumer-cryptodata-groupall");
var kafka_consumer_crypto_data_1 = require("../../infra/kafka/kafka-consumer-crypto-data");
var cron = require('node-cron');
winston_1.default.info('Initialize cron');
cron.schedule('* * * * *', function () {
    winston_1.default.info('**validating status instances**');
    new service_instance_1.ServiceInstance().validateStatusInstance();
});
cron.schedule('* * * * *', function () {
    if (process.env.NODE_ENV !== 'local') {
        winston_1.default.info('**validating cryptodata topics**');
        kafka_consumer_cryptodata_groupall_1.KafkaConsumerCryptodataGroupall.getInstance().addTopics();
        kafka_consumer_crypto_data_1.KafkaConsumerCryptoData.getInstance().addTopics();
    }
});
//# sourceMappingURL=cron.js.map