"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
var kafka = __importStar(require("kafkajs"));
var KafkaClient = /** @class */ (function () {
    function KafkaClient() {
        this.client = new kafka.Kafka({
            clientId: "InvestmentBackoffice",
            brokers: process.env.KAFKA_HOST.split(','),
            logLevel: kafka.logLevel.ERROR
        });
    }
    KafkaClient.getInstance = function () {
        if (!KafkaClient.instance)
            KafkaClient.instance = new KafkaClient();
        return KafkaClient.instance;
    };
    KafkaClient.prototype.getClient = function () {
        return this.client;
    };
    return KafkaClient;
}());
exports.KafkaClient = KafkaClient;
//# sourceMappingURL=kafka-client.js.map