"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../../../shared/db/db-");
exports.connectToArbitrorDB = function () {
    // return connectToDB(`${process.env.DB_URI as string}${process.env.DB_NAME_ARBITROR as string}`, process.env.DB_NAME_ARBITROR as string)
    return db_1.connectToDB("mongodb://13.125.222.165:27017/" + process.env.DB_NAME_ARBITROR, process.env.DB_NAME_ARBITROR);
};
exports.connectToMonitorDB = function () {
    return db_1.connectToDB("" + process.env.DB_URI + process.env.DB_NAME_MONITOR, process.env.DB_NAME_MONITOR);
};
//# sourceMappingURL=db.js.map