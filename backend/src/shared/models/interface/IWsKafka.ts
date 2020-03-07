import {WSServer} from "../../../infra/ws/ws-service";
import {IKafkaMessage} from "./IKafkaMessage";

export interface IWsKafka<T> {
    send(topic: string, message: IKafkaMessage, data: T, webSocket: WSServer): void;
}
