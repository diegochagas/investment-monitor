import express from 'express';
import {createServer, Server} from 'http';
import socketIo from 'socket.io';
import {WSServer} from './ws/ws-service';
import {
    KafkaConsumerBotEventsQueue
} from "./kafka/kafka-consumer-bot-events-queue";
import {KafkaConsumerCreateTopic} from "./kafka/kafka-consumer-create-topics";
import logger from '../shared/middlewares/winston';
import {KafkaConsumerCryptodataGroupall} from "./kafka/kafka-consumer-cryptodata-groupall";
import {KafkaConsumerCryptoData} from "./kafka/kafka-consumer-crypto-data";


export class AppServer {
    private static readonly PORT: number = 3000;
    private app: express.Application | undefined;
    private server: Server | undefined;
    public static appPort: string | number | undefined;
    public static wsPort: string | number | undefined;
    public static io: socketIo.Server;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.connectSockets();
        require('../shared/middlewares/firebase');
        require('../shared/middlewares/cron');
        if (process.env.NODE_ENV !== 'local') {
            KafkaConsumerBotEventsQueue.getInstance().init();
            KafkaConsumerCreateTopic.getInstance().init();
            KafkaConsumerCryptodataGroupall.getInstance().init();
            KafkaConsumerCryptoData.getInstance().init();
        }
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer();
    }

    private config(): void {
        AppServer.appPort = process.env.PORT || AppServer.PORT;
        AppServer.wsPort = process.env.WS_PORT || 3001
    }

    private sockets(): void {
        AppServer.io = socketIo(this.server);
    }

    private connectSockets(): void {
        WSServer.getInstance().connectSocket().then(() => {
            // reconect client.
        });
    }

    public listen(): void {
        this.app!.listen(AppServer.appPort!, () => logger.info(`Application running on port: ${AppServer.appPort}`));
        (this.server as Server).listen(AppServer.wsPort, () => {
            logger.info(`WebSocket running on port ${AppServer.wsPort}`);
        });
    }

    public getApp(): express.Application {
        return this.app != undefined ? this.app : express();
    }
}
