"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var winston_1 = __importDefault(require("../../../shared/middlewares/winston"));
var connection;
exports.connectToCommonDB = function () {
    var dbUri = "" + process.env.DB_URI + process.env.DB_NAME_COMMON;
    if (!connection) {
        winston_1.default.info('Start connecting db common...');
        connection = mongoose_1.createConnection(dbUri, { useNewUrlParser: true, useFindAndModify: true });
    }
    if (connection)
        winston_1.default.info('Return mongoose aready connected to common');
    return connection;
};
//# sourceMappingURL=db.js.map