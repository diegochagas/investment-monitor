import { createConnection, Connection} from 'mongoose';
import logger from '../../../shared/middlewares/winston';

let connection: Connection;
export const connectToStrategyDB = () => {

  const dbUri: string = `${process.env.DB_URI as string}${process.env.DB_NAME_STRATEGY as string}`;

  if(!connection) {
    logger.info('Start connecting db strategy...');
    connection = createConnection(dbUri, {useNewUrlParser: true, useFindAndModify: true})
  }
  if(connection) logger.info('Return mongoose aready connected to strategy');
  return connection

};

