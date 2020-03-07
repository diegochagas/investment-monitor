"use strict";
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Topic_1 = require("../../app/commons/models/topic/Topic");
var winston_1 = __importDefault(require("../../shared/middlewares/winston"));
var ws_service_1 = require("../ws/ws-service");
var kafka_client_1 = require("./kafka-client");
var prefix = "KAFKA_CONSUMER_CRYPTODATA => ";
var KafkaConsumerCryptoData = /** @class */ (function () {
    function KafkaConsumerCryptoData() {
        this.topics = [];
        this.client = kafka_client_1.KafkaClient.getInstance().getClient();
        this.createConsumer();
    }
    KafkaConsumerCryptoData.prototype.createConsumer = function () {
        this.consumer = this.client.consumer({
            groupId: "group_cryptodata",
            allowAutoTopicCreation: true,
        });
    };
    KafkaConsumerCryptoData.getInstance = function () {
        if (!KafkaConsumerCryptoData.instance) {
            KafkaConsumerCryptoData.instance = new KafkaConsumerCryptoData();
        }
        return KafkaConsumerCryptoData.instance;
    };
    KafkaConsumerCryptoData.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTopics()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connectConsumers()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaConsumerCryptoData.prototype.getTopics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Topic_1.TopicSchema.find({ group: null })];
                    case 1:
                        _a.topics = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaConsumerCryptoData.prototype.getConsumers = function () {
        return this.topics.map(function (topic) { return ({
            topic: ("" + topic.name + (topic.type ? "_" + topic.type : '')).toUpperCase(),
            fromBeginning: false
        }); });
    };
    KafkaConsumerCryptoData.prototype.connectConsumers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, _b, _c, topic, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        winston_1.default.info(prefix + "connect to consumers");
                        return [4 /*yield*/, this.consumer.connect()];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 9]);
                        _b = __values(this.getConsumers()), _c = _b.next();
                        _d.label = 3;
                    case 3:
                        if (!!_c.done) return [3 /*break*/, 6];
                        topic = _c.value;
                        winston_1.default.info(prefix + "connecting to topic", topic);
                        return [4 /*yield*/, this.consumer.subscribe(topic)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _c = _b.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, this.run()];
                    case 10:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaConsumerCryptoData.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consumer.run({
                            autoCommit: true,
                            eachMessage: function (_a) {
                                var topic = _a.topic, partition = _a.partition, message = _a.message;
                                return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_b) {
                                        winston_1.default.debug(prefix + ("Message received on topic " + topic), JSON.parse(message.value.toString()));
                                        ws_service_1.WSServer.getInstance().send(JSON.parse(message.value.toString()), topic);
                                        return [2 /*return*/];
                                    });
                                });
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    KafkaConsumerCryptoData.prototype.addTopics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var aux, e_2, e_3, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Topic_1.TopicSchema.find({ group: null })];
                    case 1:
                        aux = _a.sent();
                        if (!(aux.length === 0)) return [3 /*break*/, 7];
                        winston_1.default.info(prefix + "0 topics founded, disconecting...");
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        this.topics = aux;
                        return [4 /*yield*/, this.consumer.stop()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.consumer.disconnect()];
                    case 4:
                        _a.sent();
                        winston_1.default.info(prefix + "Consumer diconnected");
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        winston_1.default.error(prefix + ("error to disconnect: " + e_2.message));
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 17];
                    case 7:
                        if (!(JSON.stringify(this.topics) !== JSON.stringify(aux))) return [3 /*break*/, 16];
                        this.topics = aux;
                        winston_1.default.info(prefix + "topics modify, reconecting...");
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, this.consumer.stop()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.consumer.disconnect()];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_3 = _a.sent();
                        winston_1.default.error(prefix + ("error to disconnect new consumers: " + e_3.message));
                        return [3 /*break*/, 12];
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        this.createConsumer();
                        return [4 /*yield*/, this.connectConsumers()];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        e_4 = _a.sent();
                        winston_1.default.error(prefix + ("error to reconnect new consumers: " + e_4.message));
                        return [3 /*break*/, 15];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        winston_1.default.info(prefix + "Do not need to reconnect");
                        _a.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    return KafkaConsumerCryptoData;
}());
exports.KafkaConsumerCryptoData = KafkaConsumerCryptoData;
//# sourceMappingURL=kafka-consumer-crypto-data.js.map