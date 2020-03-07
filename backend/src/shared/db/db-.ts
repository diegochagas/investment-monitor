import { createConnection, Connection} from 'mongoose';
import logger from '../middlewares/winston';

let connection: Map<string, Connection> = new Map();
export const connectToDB = (dbUri: string, dbName: string): Connection => {
    logger.info('Getting generic connection DB');
    if(!connection.get(dbName)) {
        logger.info(`Start connecting db ${dbName}...`);
        connection.set(dbName, createConnection(dbUri, {useNewUrlParser: true, useFindAndModify: true}))
    } else logger.info(`Return mongoose already connected to ${dbName}`);
    return connection.get(dbName)!;
};
