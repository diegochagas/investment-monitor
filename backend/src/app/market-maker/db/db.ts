import { createConnection, Connection} from 'mongoose';
import logger from '../../../shared/middlewares/winston';

let connection: Connection;
export const connectToMarketMakerDB = () => {

  const dbUri: string = `${process.env.DB_URI as string}${process.env.DB_NAME_MARKET_MAKER as string}`;

  if(!connection) {
    logger.info('Start connecting db market_maker...');
    connection = createConnection(dbUri, {useNewUrlParser: true, useFindAndModify: true})
  }
  if(connection) logger.info('Return mongoose aready connected to market_maker');
  return connection
};

