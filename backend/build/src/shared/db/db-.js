"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var winston_1 = __importDefault(require("../middlewares/winston"));
var connection = new Map();
exports.connectToDB = function (dbUri, dbName) {
    winston_1.default.info('Getting generic connection DB');
    if (!connection.get(dbName)) {
        winston_1.default.info("Start connecting db " + dbName + "...");
        connection.set(dbName, mongoose_1.createConnection(dbUri, { useNewUrlParser: true, useFindAndModify: true }));
    }
    else
        winston_1.default.info("Return mongoose already connected to " + dbName);
    return connection.get(dbName);
};
//# sourceMappingURL=db-.js.map