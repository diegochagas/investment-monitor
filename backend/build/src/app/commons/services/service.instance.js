"use strict";
/*
* Copyright (C) Atlas Project LLC
* All Rights Reserved.
*
* Unauthorized copying of this file, via any medium is strictly prohibited.
*
* Proprietary and confidential.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var Instance_1 = require("../models/instance/Instance");
var kafka_producer_1 = require("../../../infra/kafka/kafka-producer");
var mongoose_1 = require("mongoose");
var system_errors_1 = require("../../../shared/helpers/system-errors");
var moment = require("moment");
var ws_service_1 = require("../../../infra/ws/ws-service");
var factorPool_1 = require("../../../shared/util/factorPool");
var Topic_1 = require("../../../shared/models/enum/Topic");
var area_en_1 = require("../../../shared/models/enum/area.en");
var Exchange_1 = require("../models/exchange/Exchange");
var projectName_1 = require("../../../shared/models/enum/projectName");
var winston_1 = __importDefault(require("../../../shared/middlewares/winston"));
var kafkaProducer = kafka_producer_1.KafkaProducer.getInstance();
var prefix = 'SERVICE_INSTANCE => ';
var ServiceInstance = /** @class */ (function () {
    function ServiceInstance() {
        var _this = this;
        this.getInstances = function (project) { return __awaiter(_this, void 0, void 0, function () {
            var type, instances, response, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        type = projectName_1.HeaderProject[project];
                        return [4 /*yield*/, Instance_1.InstanceSchema.find({ type: type }) /*.populate('strategy')*/.exec()];
                    case 1:
                        instances = _a.sent();
                        return [4 /*yield*/, Promise.all((instances.map(function (instance) { return __awaiter(_this, void 0, void 0, function () {
                                var strategy;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!instance.strategy) return [3 /*break*/, 2];
                                            return [4 /*yield*/, factorPool_1.services.get(projectName_1.Project[instance.type]).getStrategiesById(instance.strategy)];
                                        case 1:
                                            strategy = _a.sent();
                                            instance.strategy = strategy.data;
                                            _a.label = 2;
                                        case 2: return [2 /*return*/, instance];
                                    }
                                });
                            }); })))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(400, [], 'Não foi possível obter as instances.')];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
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
        this.produceInstanceStrategy = function (params, body, strategyType) { return __awaiter(_this, void 0, void 0, function () {
            var strategySchema, instance, selectedStrategy, exchange, config, kafkaMessage, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        strategySchema = factorPool_1.schemas.get(projectName_1.HeaderProject[strategyType]);
                        if (!strategySchema)
                            throw 'Schema not found';
                        return [4 /*yield*/, Instance_1.InstanceSchema.findOne({ strategy: mongoose_1.Types.ObjectId(body.strategyId) })];
                    case 1:
                        instance = _a.sent();
                        if (instance) {
                            return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(400, false, system_errors_1.SystemErrors.STRATEGY_DUPLICATE_CONFIG.message, system_errors_1.SystemErrors.STRATEGY_DUPLICATE_CONFIG.code)];
                        }
                        return [4 /*yield*/, strategySchema.findById(body.strategyId)];
                    case 2:
                        selectedStrategy = (_a.sent());
                        if (!selectedStrategy) return [3 /*break*/, 6];
                        if (!(selectedStrategy.strategyType === projectName_1.Project.MARKET_MAKER)) return [3 /*break*/, 4];
                        if (selectedStrategy.finPair === 'BRL' || selectedStrategy.iniPair === 'BRL') {
                            selectedStrategy.config.referencePrice.forexEnable = true;
                            selectedStrategy.config.forexMarketPrice = {
                                currencyBase: "BRL",
                                currencyQuote: "USD",
                                subscribe: "FOREXAPI_CURRENCY_TICKER_USD_BRL"
                            };
                        }
                        return [4 /*yield*/, Exchange_1.ExchangeSchema.findById({ _id: selectedStrategy.config.exchange })];
                    case 3:
                        exchange = (_a.sent());
                        selectedStrategy.config.exchange = exchange.name ? exchange.name.toString().toLowerCase() : '';
                        selectedStrategy.config.exchangeOptions = {
                            "maxConcurrentRequests": exchange.maxConcurrentRequests,
                            "minTimeBetweenRequests": exchange.minTimeBetweenRequests
                        };
                        selectedStrategy.config.kafka = {
                            subscribe: __spread([
                                selectedStrategy.config.forexMarketPrice.subscribe
                            ], selectedStrategy.config.cryptoMarketPrice.exchangesOutside, selectedStrategy.config.cryptoMarketPrice.exchangesInside)
                        };
                        _a.label = 4;
                    case 4:
                        if (selectedStrategy.strategyType === projectName_1.Project.TELEGRAM) {
                            config = {
                                pairs: selectedStrategy.config.pairs.map(function (pair) { return ({
                                    pair: pair.pair,
                                    weight: pair.weight,
                                    channelId: pair.channelId,
                                    type: pair.type
                                }); }),
                                strategy: selectedStrategy.config.strategy,
                                orderSize: selectedStrategy.config.orderSize,
                                exchange: selectedStrategy.config.exchange
                            };
                            selectedStrategy.config = config;
                        }
                        kafkaMessage = this.getKafkaStrategyMessage(params.id, selectedStrategy, projectName_1.HeaderProject[strategyType]);
                        kafkaProducer.create(kafkaMessage);
                        return [4 /*yield*/, strategySchema.findOneAndUpdate({ instance: params.id }, { $unset: { instance: 1 } })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, true, 'Producer startegy complete')];
                    case 6: return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(400, false, 'Producer strategy not find in database')];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_1 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, false, 'Error producer strategy' + err_1.message);
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getKafkaStrategyMessage = function (instanceId, strategy, type) {
            var strategyMessage = {
                action: 'CONFIG',
                type: type,
                instance: instanceId,
                content: strategy.config
            };
            console.log('MESSAGE', JSON.stringify(strategyMessage));
            return {
                topic: Topic_1.TopicProducers.BOT_MANAGER,
                messages: [{ value: JSON.stringify(strategyMessage) }]
            };
        };
        this.produceInstanceStatus = function (params, instanceReq) { return __awaiter(_this, void 0, void 0, function () {
            var instance, kafkaMessage, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Instance_1.InstanceSchema.findById(params.id).populate('strategy').exec()];
                    case 1:
                        instance = _a.sent();
                        if (instance.status === 'PENDING' || instance.status === 'OFFLINE') {
                            return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(423, false, system_errors_1.SystemErrors.INSTANCE_STATUS_ERROR.message)];
                        }
                        if (instance && instance.instanceId) {
                            kafkaMessage = this.getKafkaStatusMessage(instance.instanceId, instanceReq.action, instance.type);
                            kafkaProducer.create(kafkaMessage);
                            return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, true, 'Producer status complete')];
                        }
                        else {
                            return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(400, false, 'Producer status not find in database')];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, false, 'Error producer status');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.produceStatusIntances = function () { return __awaiter(_this, void 0, void 0, function () {
            var instances, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Instance_1.InstanceSchema.find({}).exec()];
                    case 1:
                        instances = _a.sent();
                        instances.forEach(function (instance) {
                            kafkaProducer.create(_this.getKafkaStatusMessage(instance.instanceId, 'STATUS', instance.type));
                        });
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, true, 'Created producer status')];
                    case 2:
                        err_3 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, false, 'Error creating producer, status');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getKafkaStatusMessage = function (instanceId, action, type) {
            var statusMessage = {
                action: action,
                type: type,
                instance: instanceId,
                content: {}
            };
            return {
                topic: Topic_1.TopicProducers.BOT_MANAGER,
                messages: [{
                        value: JSON.stringify(statusMessage)
                    }]
            };
        };
        this.upsertInstance = function (instance) {
            var data = {
                instanceId: instance.instanceId,
                label: instance.label,
                strategy: instance.strategy,
                status: instance.status,
                reason: instance.reason,
                type: instance.type
            };
            if (!instance.reason)
                delete data.reason;
            return Instance_1.InstanceSchema.findOneAndUpdate({ instanceId: instance.instanceId }, data, { upsert: true, new: true });
        };
        this.refreshInstances = function (type) { return __awaiter(_this, void 0, void 0, function () {
            var refreshMessage, kafkaMessage, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshMessage = {
                            action: 'KEEP_ALIVE',
                            type: type,
                            instance: 'ALL',
                            content: {}
                        };
                        kafkaMessage = {
                            topic: Topic_1.TopicProducers.BOT_MANAGER,
                            messages: [{ value: JSON.stringify(refreshMessage) }]
                        };
                        return [4 /*yield*/, kafkaProducer.create(kafkaMessage)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, true, 'Instances refresh started.')];
                    case 2:
                        err_4 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, false, 'Error instances refresh started.');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.validateStatusInstance = function () { return __awaiter(_this, void 0, void 0, function () {
            var instances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Instance_1.InstanceSchema.find({}).exec()];
                    case 1:
                        instances = _a.sent();
                        instances.forEach(function (instance) {
                            if (instance.status !== Instance_1.InstanceStatus.OFFLINE) {
                                var now = moment();
                                var updatedAt = moment(instance.updatedAt);
                                var duration = moment.duration(updatedAt.diff(now));
                                if (duration.hours() <= -1 || duration.minutes() < -10) {
                                    winston_1.default.info(prefix + (instance.instanceId + " Offline " + duration.locale('pt').humanize(true)));
                                    instance.status = Instance_1.InstanceStatus.OFFLINE;
                                    Instance_1.InstanceSchema.updateOne({ _id: instance._id }, { status: Instance_1.InstanceStatus.OFFLINE })
                                        .then(function (updateInstance) {
                                        winston_1.default.info(prefix + (instance.instanceId + " updated... send to socket"));
                                        var socket = ws_service_1.WSServer.getInstance();
                                        // TODO refatorar para pegar o robo apartir da instancia
                                        socket.send(updateInstance, area_en_1.InstanceRoom[instance.type]);
                                    });
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return ServiceInstance;
}());
exports.ServiceInstance = ServiceInstance;
//# sourceMappingURL=service.instance.js.map