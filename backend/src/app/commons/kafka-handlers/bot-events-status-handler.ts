/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import {wsRoom, WSServer} from "../../../infra/ws/ws-service";
import {IWsKafka} from "../../../shared/models/interface/IWsKafka";
import {IKafkastatusContent} from "../models/interfaces/IKafkaStatusContent";
import {Instance, InstanceSchema} from "../models/instance/Instance";
import * as instanceController from '../controllers/instance'
import * as strategyController from '../../strategy/controllers/strategy';
import {schemas} from "../../../shared/util/factorPool";
import {Project} from "../../../shared/models/enum/projectName";
import logger from "../../../shared/middlewares/winston";
import {IKafkaMessage} from "../../../shared/models/interface/IKafkaMessage";

const prefix = 'BOT_EVENTS_STATUS_HANDLER => ';
export class BotEventsStatusHandler implements IWsKafka<IKafkastatusContent> {

    public async send(topic: string, message: IKafkaMessage, data: IKafkastatusContent , webSocket: WSServer) {

        logger.info(prefix + 'processing Instance method from kafka message');
        logger.info(prefix + `content => `, data);
        let strategyFind: any;
        if (message.strategy) {
            strategyFind = await strategyController.findStrategyByName(message.strategy.name, message.strategy.version, message.type);
        }
        if(!strategyFind)
            logger.info(prefix + `Strategy not found => ${JSON.stringify(message.strategy)}`, message.strategy);

        const instance = new InstanceSchema({
            instanceId: message.instance,
            status: data.status,
            type: message.type,
            strategy: strategyFind ? strategyFind['_id'] : null,
            label: "",
            reason: data.reason
        }) as Instance;
        instanceController.upsertInstance(instance)
            .then(async (upsertedInstance) => {
                if(strategyFind) {
                    const schema = schemas.get(Project[message.type]);
                    if(schema) {
                        const strategy = await schema.findOneAndUpdate({ _id: strategyFind['_id']}, { $set: { instance: instance.instanceId}}, {new: true});
                        upsertedInstance.strategy = strategy;
                    }else {
                        logger.info(prefix+`Not found schema: ${Project[message.type]}`)
                    }
                    logger.info(prefix + `Sending Status to socket with strategy found`);
                    webSocket.send(upsertedInstance, wsRoom[topic] );
                } else {
                    logger.info(prefix + `Sending Status to socket without strategy found`);
                    webSocket.send(upsertedInstance, wsRoom[topic] );
                }
            })
            .catch(error => logger.error(prefix + 'error dto instance: ' + error.message))
    }

}

