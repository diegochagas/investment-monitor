import {ElasticSearchClient} from "../core/tools/elastic-search-client";

const appRoot = require('app-root-path');
const winston = require('winston')
const options = {
    file: {
        level: 'silly',
        filename: `app.log`,
        dirname: `${appRoot}/logs/`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        timestamp: true,
    },
    console: {
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
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

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
        // elasticSearchTransport
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: (message, encoding) => {
        logger.info(message, encoding);
    },
} as any;
export default logger;
