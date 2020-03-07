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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Topic_1 = require("../../app/commons/models/topic/Topic");
var winston_1 = __importDefault(require("../../shared/middlewares/winston"));
var kafka_client_1 = require("./kafka-client");
var prefix = 'KAFKA_CONSUMER_CREATE_TOPICS => ';
var KafkaConsumerCreateTopic = /** @class */ (function () {
    function KafkaConsumerCreateTopic() {
        this.client = kafka_client_1.KafkaClient.getInstance().getClient();
    }
    KafkaConsumerCreateTopic.getInstance = function () {
        winston_1.default.info(prefix + 'starting consumer.');
        if (!KafkaConsumerCreateTopic.instance) {
            KafkaConsumerCreateTopic.instance = new KafkaConsumerCreateTopic();
        }
        return KafkaConsumerCreateTopic.instance;
    };
    KafkaConsumerCreateTopic.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectConsumers()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaConsumerCreateTopic.prototype.createTopic = function (topic) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.admin = this.client.admin();
                        return [4 /*yield*/, this.admin.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 11]);
                        winston_1.default.info(prefix + " Verifying topic exist on kafka....");
                        return [4 /*yield*/, this.admin.fetchTopicMetadata({
                                topics: [topic]
                            })];
                    case 3:
                        _a.sent();
                        winston_1.default.info(prefix + " Topic " + topic + " already exist");
                        return [4 /*yield*/, this.admin.disconnect()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 5:
                        err_1 = _a.sent();
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 9, , 10]);
                        winston_1.default.info(prefix + " Topic " + topic + " doest not exist, creating...");
                        return [4 /*yield*/, this.admin.createTopics({
                                topics: [
                                    {
                                        topic: topic,
                                        numPartitions: 1,
                                        replicationFactor: 1
                                    }
                                ]
                            })];
                    case 7:
                        _a.sent();
                        winston_1.default.info(prefix + " Topic " + topic + " created");
                        return [4 /*yield*/, this.admin.disconnect()];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        winston_1.default.error(prefix + " Error to create topic: " + e_1.message);
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    KafkaConsumerCreateTopic.prototype.connectConsumers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var consumer;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consumer = this.client.consumer({
                            groupId: "group_create-topics",
                            allowAutoTopicCreation: true
                        });
                        return [4 /*yield*/, consumer.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, consumer.subscribe({
                                topic: Topic_1.TOPIC_QUEUE
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, consumer.run({
                                autoCommit: true,
                                eachMessage: function (_a) {
                                    var topic = _a.topic, partition = _a.partition, message = _a.message;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var msg;
                                        var _this = this;
                                        return __generator(this, function (_b) {
                                            winston_1.default.info(prefix + " Message received on topic " + topic + ": ", JSON.parse(message.value.toString()));
                                            msg = JSON.parse(message.value.toString());
                                            Topic_1.TopicSchema.findOneAndUpdate({ name: msg.content.toUpperCase() }, { name: msg.content.toUpperCase() }, {
                                                upsert: true,
                                                new: true
                                            })
                                                .then(function (topic) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            winston_1.default.info(prefix + " topic created on database=>", topic);
                                                            return [4 /*yield*/, this.createTopic(msg.content)];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })
                                                .catch(function (err) { return winston_1.default.error(prefix + " - topic error =>", err); });
                                            return [2 /*return*/];
                                        });
                                    });
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return KafkaConsumerCreateTopic;
}());
exports.KafkaConsumerCreateTopic = KafkaConsumerCreateTopic;
//# sourceMappingURL=kafka-consumer-create-topics.js.map