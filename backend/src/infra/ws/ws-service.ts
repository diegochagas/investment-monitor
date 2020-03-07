import {AppServer} from '../app-server';
import {AreaEn} from '../../shared/models/enum/area.en';
import logger from '../../shared/middlewares/winston';

const prefix = 'WS_SERVER => ';

export class WSServer {
    private static instance: WSServer;
    public static socket: any;

    private constructor() {
    }

    public static getInstance(): WSServer {
        if (!WSServer.instance) {
            WSServer.instance = new WSServer();
        }
        return WSServer.instance;
    }

    public async connectSocket(): Promise<void> {


        return AppServer.io.use((socket, next) => {

            if (socket.handshake.query.authentication === '434B882D1EF0CC952A896DD42612A71D4EC82594523EDDBF197A4DEA4010A515') {/*internal*/
                logger.info(prefix + ' Connecting internal client ');
                next();
            } else if (socket.handshake.query.authentication === '30E0ECC4B7F193E8D56E34E65DAAD1626C2B8729C8FB495DB2C9BEE8304B8B3E') { /*external*/
                logger.info(prefix + ' Connecting external client ');
                next()
            } else next(new Error('Authentication error'));

        }).on('connect', (socket: any) => {
            logger.info(prefix + `Connected client on port ${AppServer.wsPort} `);

            socket.on('rooms', (rooms: AreaEn) => {
                socket.join(rooms);
                logger.info(prefix + `[client in romms: ${rooms}]`);
            });

            socket.on('disconnect', (area: AreaEn) => {
                logger.info(prefix + `Socket ${socket.id} disconnected.`);
            });

            if (WSServer.socket === undefined) {
                WSServer.socket = socket;
            }
            return Promise.resolve();
        });
    }

    public send(message: any, area: string): void {
        if(area.includes('COIN_API') || area.includes('COINAPI')) logger.debug(prefix + ' send msg to room: ' + area);
        else logger.info(prefix + `send msg to rooms: ${area}`);
        if (AppServer.io.to(area) != undefined && area != AreaEn.RECONNECT) {
            AppServer.io.to(area).emit(area, message);
        }
    }
}

export const wsRoom = {
    'BOT_EVENTS_GARCH': AreaEn.ROBOT_GARCH,
    'BOT_EVENTS_MARKETMAKER': AreaEn.ROBOT_MARKET_MAKER,
    'BOT_EVENTS_TELEGRAM': AreaEn.ROBOT_TELEGRAM
};
