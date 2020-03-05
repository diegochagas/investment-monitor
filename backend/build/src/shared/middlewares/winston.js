"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appRoot = require('app-root-path');
var winston = require('winston');
var options = {
    file: {
        level: 'silly',
        filename: "app.log",
        dirname: appRoot + "/logs/",
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
        timestamp: true,
    },
    console: {
        level: 'info',
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        prettyPrint: true,
        colorize: process.stdout.isTTY
    },
};
/*const winstonElasticSearch = require("winston-elasticsearch");
const elasticSearchTransport = new winstonElasticSearch({
    level: process.env.ELASTICSEARCH_LOG_LEVEL,
    index: `${process.env.NODE_ENV}_${process.env.ELASTICSEARCH_LOG_INDEX}_investment_backoffice`,
    messageType: `${process.env.NODE_ENV}_${process.env.ELASTICSEARCH_LOG_TYPE}_investment_backoffice`,
    client: (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod') ? ElasticSearchClient.getInstance() : undefined,
    transformer: (logData: any) => {
        logData["@timestamp"] = new Date().toISOString();
        logData.meta = {
            json: JSON.stringify(logData.meta)
        };
        return logData
    },
});*/
var logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false,
});
logger.stream = {
    write: function (message, encoding) {
        logger.info(message, encoding);
    },
};
exports.default = logger;
//# sourceMappingURL=winston.js.map