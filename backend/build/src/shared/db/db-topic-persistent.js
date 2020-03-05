"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var winston_1 = __importDefault(require("../middlewares/winston"));
var connection;
exports.connectToTopicPersistentDB = function () {
    var dbUri = "" + process.env.DB_URI + process.env.DB_NAME_TOPIC_PERSISTENT;
    if (!connection) {
        winston_1.default.info('Start connecting db topic_persistent...');
        connection = mongoose_1.createConnection(dbUri, { useNewUrlParser: true, useFindAndModify: true });
    }
    if (connection)
        winston_1.default.info('Return mongoose already connected to topic_persistent');
    return connection;
};
//# sourceMappingURL=db-topic-persistent.js.map