import { createConnection, Connection} from 'mongoose';
import logger from '../../../shared/middlewares/winston';

let connection: Connection;
export const connectToCommonDB = () => {
  const dbUri: string = `${process.env.DB_URI as string}${process.env.DB_NAME_COMMON as string}`;
  if(!connection) {
    logger.info('Start connecting db common...');
    connection = createConnection(dbUri, {useNewUrlParser: true, useFindAndModify: true})
  }
  if(connection) logger.info('Return mongoose aready connected to common');
  return connection

};

