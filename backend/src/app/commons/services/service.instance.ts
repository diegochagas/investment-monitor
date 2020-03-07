/*
* Copyright (C) Atlas Project LLC
* All Rights Reserved.
*
* Unauthorized copying of this file, via any medium is strictly prohibited.
*
* Proprietary and confidential.
*/


import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {Instance, InstanceSchema, InstanceStatus, InstanceType} from "../models/instance/Instance";
import {KafkaProducer} from "../../../infra/kafka/kafka-producer";
import {Types} from "mongoose";
import {SystemErrors} from "../../../shared/helpers/system-errors";
import moment = require("moment");
import {WSServer} from "../../../infra/ws/ws-service";
import {schemas, services} from "../../../shared/util/factorPool";
import {AbstractStrategy} from "../../strategy/models/strategy/AbstractStrategy";
import {TopicProducers} from "../../../shared/models/enum/Topic";
import {InstanceRoom} from "../../../shared/models/enum/area.en";
import {IKafkaMessage} from "../../../shared/models/interface/IKafkaMessage";
import {ExchangeSchema, Exchange} from "../models/exchange/Exchange";
import {HeaderProject, Project} from "../../../shared/models/enum/projectName";
import {ServiceStrategy} from "../../strategy/services/service.strategy";
import {Typegoose} from "typegoose";
import logger from "../../../shared/middlewares/winston";
import {ProducerRecord} from "kafkajs";
import {TelegramStrategy} from "../../strategy/models/strategy/TelegramStrategy";
import {Pair} from "../../strategy/models/strategy/configs/types/Pair";
import {ConfigReferencePrice} from "../../strategy/models/strategy/configs/types/ConfigReferencePrice";

const kafkaProducer = KafkaProducer.getInstance();
const prefix = 'SERVICE_INSTANCE => ';

export class ServiceInstance {
    constructor() {

    }

    public getInstances = async (project: string): Promise<ApplicationResponse<Instance[]>> => {

        try {
            const type = HeaderProject[project];
            const instances = await InstanceSchema.find({type})/*.populate('strategy')*/.exec();
            const response = await Promise.all((instances.map(async instance => {
                if (instance.strategy) {
                    const strategy = await (services.get(Project[instance.type as string]) as ServiceStrategy<any, Typegoose>).getStrategiesById(instance.strategy as string) as any
                    instance.strategy = strategy.data;
                }
                return instance
            }))) as any;
            return new ApplicationResponse<Instance[]>(200, response);
        } catch (e) {
            return new ApplicationResponse<Instance[]>(400, [], 'Não foi possível obter as instances.');
        }


    }

    // public createInstance = async (instance: Instance, type) : Promise<ApplicationResponse<Instance>> => {
    //     try {
    //         const model = populate(Instance, instance);
    //         await handleValidateError(await validate(model));
    //         const dao = await new InstanceSchema(model).save();
    //         return new ApplicationResponse<Instance>(200, dao);
    //     }catch(err) {
    //
    //         if(err instanceof ApplicationResponse) {
    //             return err
    //         }
    //         return new ApplicationResponse<any>(400, err, 'Não foi possível criar a instance')
    //     }
    // }
    //
    // public deleteInstance = async (id: string) : Promise<ApplicationResponse<boolean>> => {
    //     try {
    //         await InstanceSchema.deleteOne({ _id: id });
    //         return new ApplicationResponse<boolean>(200, true, 'Sucesso ao deletar instance');
    //     } catch (err) {
    //         throw  new ApplicationResponse<Instance>(400, undefined, 'Não foi possível deletar a instance')
    //     }
    // }

    public produceInstanceStrategy = async (params: any, body: any, strategyType: string): Promise<ApplicationResponse<boolean>> => {
        try {

            const strategySchema = schemas.get(HeaderProject[strategyType]);
            if (!strategySchema)
                throw 'Schema not found';

            const instance = await InstanceSchema.findOne({strategy: Types.ObjectId(body.strategyId)});
            if (instance) {
                return new ApplicationResponse<boolean>(400, false, SystemErrors.STRATEGY_DUPLICATE_CONFIG.message, SystemErrors.STRATEGY_DUPLICATE_CONFIG.code);
            }
            const selectedStrategy = (await strategySchema.findById(body.strategyId)) as any;

            if (selectedStrategy) {
                if (selectedStrategy.strategyType === Project.MARKET_MAKER) {


                    if (selectedStrategy.finPair === 'BRL' || selectedStrategy.iniPair === 'BRL') {
                        (<ConfigReferencePrice>selectedStrategy.config.referencePrice).forexEnable = true;
                        selectedStrategy.config.forexMarketPrice = {
                            currencyBase: "BRL",
                            currencyQuote: "USD",
                            subscribe: "FOREXAPI_CURRENCY_TICKER_USD_BRL"
                        }
                    }

                    const exchange = (await ExchangeSchema.findById({_id: (selectedStrategy as any).config.exchange})) as Exchange;
                    selectedStrategy.config.exchange = exchange.name ? exchange.name.toString().toLowerCase() : '';
                    selectedStrategy.config.exchangeOptions = {
                        "maxConcurrentRequests": exchange.maxConcurrentRequests,
                        "minTimeBetweenRequests": exchange.minTimeBetweenRequests
                    };

                    selectedStrategy.config.kafka = {
                        subscribe: [
                            selectedStrategy.config.forexMarketPrice.subscribe,
                            ...selectedStrategy.config.cryptoMarketPrice.exchangesOutside,
                            ...selectedStrategy.config.cryptoMarketPrice.exchangesInside,

                        ]
                    }

                }

                if (selectedStrategy.strategyType === Project.TELEGRAM) {
                    const config = {
                        pairs: ((selectedStrategy as TelegramStrategy).config.pairs as Pair[]).map(pair => ({
                            pair: pair.pair,
                            weight: pair.weight,
                            channelId: pair.channelId,
                            type: pair.type
                        })),
                        strategy: (selectedStrategy as TelegramStrategy).config.strategy,
                        orderSize: (selectedStrategy as TelegramStrategy).config.orderSize,
                        exchange: (selectedStrategy as TelegramStrategy).config.exchange
                    };
                    selectedStrategy.config = config;

                }


                const kafkaMessage = this.getKafkaStrategyMessage(params.id, selectedStrategy, HeaderProject[strategyType]);
                kafkaProducer.create(kafkaMessage);

                await strategySchema.findOneAndUpdate({instance: params.id}, {$unset: {instance: 1}});

                return new ApplicationResponse<boolean>(200, true, 'Producer startegy complete');
            } else {
                return new ApplicationResponse<boolean>(400, false, 'Producer strategy not find in database');
            }
        } catch (err) {
            throw new ApplicationResponse<boolean>(400, false, 'Error producer strategy' + err.message);
        }
    }

    private getKafkaStrategyMessage = (instanceId: string, strategy: AbstractStrategy<any>, type: Project): ProducerRecord => {
        const strategyMessage: IKafkaMessage = {
            action: 'CONFIG',
            type,
            instance: instanceId,
            content: strategy.config
        };

        console.log('MESSAGE', JSON.stringify(strategyMessage))

        return {
            topic: TopicProducers.BOT_MANAGER,
            messages: [{value: JSON.stringify(strategyMessage)}]
        };
    }

    public produceInstanceStatus = async (params: any, instanceReq: { action }): Promise<ApplicationResponse<boolean>> => {
        try {
            const instance = await InstanceSchema.findById(params.id).populate('strategy').exec() as Instance;
            if (instance.status === 'PENDING' || instance.status === 'OFFLINE') {
                return new ApplicationResponse<boolean>(423, false, SystemErrors.INSTANCE_STATUS_ERROR.message);
            }
            if (instance && instance.instanceId) {
                const kafkaMessage = this.getKafkaStatusMessage(instance.instanceId, instanceReq.action, instance.type as InstanceType);
                kafkaProducer.create(kafkaMessage);
                return new ApplicationResponse<boolean>(200, true, 'Producer status complete');
            } else {
                return new ApplicationResponse<boolean>(400, false, 'Producer status not find in database');
            }
        } catch (err) {
            throw new ApplicationResponse<boolean>(400, false, 'Error producer status');
        }
    }

    public produceStatusIntances = async (): Promise<ApplicationResponse<boolean>> => {
        try {
            const instances = await InstanceSchema.find({}).exec() as Instance[];
            instances.forEach(instance => {
                kafkaProducer.create(this.getKafkaStatusMessage(instance.instanceId as string, 'STATUS', instance.type as InstanceType))
            });
            return new ApplicationResponse<boolean>(200, true, 'Created producer status');
        } catch (err) {
            throw new ApplicationResponse<boolean>(400, false, 'Error creating producer, status')
        }
    };

    private getKafkaStatusMessage = (instanceId: string, action: string, type: InstanceType): ProducerRecord => {
        const statusMessage: IKafkaMessage = {
            action,
            type,
            instance: instanceId,
            content: {}
        };
        return {
            topic: TopicProducers.BOT_MANAGER,
            messages: [{
                value: JSON.stringify(statusMessage)
            }]
        };
    };

    public upsertInstance = (instance: Instance): any => {
        const data = {
            instanceId: instance.instanceId,
            label: instance.label,
            strategy: instance.strategy,
            status: instance.status,
            reason: instance.reason,
            type: instance.type
        } as Instance;
        if (!instance.reason)
            delete data.reason;
        return InstanceSchema.findOneAndUpdate({instanceId: instance.instanceId},
            data,
            {upsert: true, new: true});
    };

    public refreshInstances = async (type: InstanceType): Promise<ApplicationResponse<boolean>> => {
        try {
            const refreshMessage: IKafkaMessage = {
                action: 'KEEP_ALIVE',
                type,
                instance: 'ALL',
                content: {}
            };
            const kafkaMessage: ProducerRecord = {
                topic: TopicProducers.BOT_MANAGER,
                messages: [{value: JSON.stringify(refreshMessage)}]
            };
            await kafkaProducer.create(kafkaMessage);
            return new ApplicationResponse<boolean>(200, true, 'Instances refresh started.');
        } catch (err) {
            throw new ApplicationResponse<boolean>(400, false, 'Error instances refresh started.');
        }
    };

    public validateStatusInstance = async () => {
        const instances = await InstanceSchema.find({}).exec();
        instances.forEach(instance => {
            if (instance.status !== InstanceStatus.OFFLINE) {

                const now = moment();
                const updatedAt = moment(instance.updatedAt);
                const duration = moment.duration(updatedAt.diff(now));

                if (duration.hours() <= -1 || duration.minutes() < -10) {
                    logger.info(prefix + `${instance.instanceId} Offline ${duration.locale('pt').humanize(true)}`);
                    instance.status = InstanceStatus.OFFLINE
                    InstanceSchema.updateOne({_id: instance._id}, {status: InstanceStatus.OFFLINE})
                        .then(updateInstance => {
                            logger.info(prefix + `${instance.instanceId} updated... send to socket`);
                            const socket = WSServer.getInstance();
                            // TODO refatorar para pegar o robo apartir da instancia
                            socket.send(updateInstance, InstanceRoom[instance.type as string])
                        })
                }
            }
        })
    };
}
