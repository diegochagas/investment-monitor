"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var winston_1 = __importDefault(require("../../../shared/middlewares/winston"));
var connection;
exports.connectToEvoManagerDB = function () {
    var dbUri = "" + process.env.DB_URI + process.env.DB_NAME_EVO_MANAGER;
    if (!connection) {
        winston_1.default.info('Start connecting db evo_manager...');
        connection = mongoose_1.createConnection(dbUri, { useNewUrlParser: true, useFindAndModify: true });
    }
    if (connection)
        winston_1.default.info('Return mongoose aready connected to evo_manager');
    return connection;
};
//# sourceMappingURL=db.js.map