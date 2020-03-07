import { createConnection, Connection} from 'mongoose';
import logger from '../middlewares/winston';

let connection: Connection;
export const connectToTopicPersistentDB = () => {
    const dbUri: string = `${process.env.DB_URI as string}${process.env.DB_NAME_TOPIC_PERSISTENT as string}`;

    if(!connection) {
        logger.info('Start connecting db topic_persistent...');
        connection = createConnection(dbUri, {useNewUrlParser: true, useFindAndModify: true})
    }
    if(connection) logger.info('Return mongoose already connected to topic_persistent');
    return connection;
};
