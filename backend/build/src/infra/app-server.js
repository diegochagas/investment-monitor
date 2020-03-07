"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = __importDefault(require("socket.io"));
var ws_service_1 = require("./ws/ws-service");
var kafka_consumer_bot_events_queue_1 = require("./kafka/kafka-consumer-bot-events-queue");
var kafka_consumer_create_topics_1 = require("./kafka/kafka-consumer-create-topics");
var winston_1 = __importDefault(require("../shared/middlewares/winston"));
var kafka_consumer_cryptodata_groupall_1 = require("./kafka/kafka-consumer-cryptodata-groupall");
var kafka_consumer_crypto_data_1 = require("./kafka/kafka-consumer-crypto-data");
var AppServer = /** @class */ (function () {
    function AppServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.connectSockets();
        require('../shared/middlewares/firebase');
        require('../shared/middlewares/cron');
        if (process.env.NODE_ENV !== 'local') {
            kafka_consumer_bot_events_queue_1.KafkaConsumerBotEventsQueue.getInstance().init();
            kafka_consumer_create_topics_1.KafkaConsumerCreateTopic.getInstance().init();
            kafka_consumer_cryptodata_groupall_1.KafkaConsumerCryptodataGroupall.getInstance().init();
            kafka_consumer_crypto_data_1.KafkaConsumerCryptoData.getInstance().init();
        }
        this.listen();
    }
    AppServer.prototype.createApp = function () {
        this.app = express_1.default();
    };
    AppServer.prototype.createServer = function () {
        this.server = http_1.createServer();
    };
    AppServer.prototype.config = function () {
        AppServer.appPort = process.env.PORT || AppServer.PORT;
        AppServer.wsPort = process.env.WS_PORT || 3001;
    };
    AppServer.prototype.sockets = function () {
        AppServer.io = socket_io_1.default(this.server);
    };
    AppServer.prototype.connectSockets = function () {
        ws_service_1.WSServer.getInstance().connectSocket().then(function () {
            // reconect client.
        });
    };
    AppServer.prototype.listen = function () {
        this.app.listen(AppServer.appPort, function () { return winston_1.default.info("Application running on port: " + AppServer.appPort); });
        this.server.listen(AppServer.wsPort, function () {
            winston_1.default.info("WebSocket running on port " + AppServer.wsPort);
        });
    };
    AppServer.prototype.getApp = function () {
        return this.app != undefined ? this.app : express_1.default();
    };
    AppServer.PORT = 3000;
    return AppServer;
}());
exports.AppServer = AppServer;
//# sourceMappingURL=app-server.js.map