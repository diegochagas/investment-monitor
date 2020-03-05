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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_service_1 = require("../../../infra/ws/ws-service");
var Instance_1 = require("../models/instance/Instance");
var instanceController = __importStar(require("../controllers/instance"));
var strategyController = __importStar(require("../../strategy/controllers/strategy"));
var factorPool_1 = require("../../../shared/util/factorPool");
var projectName_1 = require("../../../shared/models/enum/projectName");
var winston_1 = __importDefault(require("../../../shared/middlewares/winston"));
var prefix = 'BOT_EVENTS_STATUS_HANDLER => ';
var BotEventsStatusHandler = /** @class */ (function () {
    function BotEventsStatusHandler() {
    }
    BotEventsStatusHandler.prototype.send = function (topic, message, data, webSocket) {
        return __awaiter(this, void 0, void 0, function () {
            var strategyFind, instance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        winston_1.default.info(prefix + 'processing Instance method from kafka message');
                        winston_1.default.info(prefix + "content => ", data);
                        if (!message.strategy) return [3 /*break*/, 2];
                        return [4 /*yield*/, strategyController.findStrategyByName(message.strategy.name, message.strategy.version, message.type)];
                    case 1:
                        strategyFind = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!strategyFind)
                            winston_1.default.info(prefix + ("Strategy not found => " + JSON.stringify(message.strategy)), message.strategy);
                        instance = new Instance_1.InstanceSchema({
                            instanceId: message.instance,
                            status: data.status,
                            type: message.type,
                            strategy: strategyFind ? strategyFind['_id'] : null,
                            label: "",
                            reason: data.reason
                        });
                        instanceController.upsertInstance(instance)
                            .then(function (upsertedInstance) { return __awaiter(_this, void 0, void 0, function () {
                            var schema, strategy;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!strategyFind) return [3 /*break*/, 4];
                                        schema = factorPool_1.schemas.get(projectName_1.Project[message.type]);
                                        if (!schema) return [3 /*break*/, 2];
                                        return [4 /*yield*/, schema.findOneAndUpdate({ _id: strategyFind['_id'] }, { $set: { instance: instance.instanceId } }, { new: true })];
                                    case 1:
                                        strategy = _a.sent();
                                        upsertedInstance.strategy = strategy;
                                        return [3 /*break*/, 3];
                                    case 2:
                                        winston_1.default.info(prefix + ("Not found schema: " + projectName_1.Project[message.type]));
                                        _a.label = 3;
                                    case 3:
                                        winston_1.default.info(prefix + "Sending Status to socket with strategy found");
                                        webSocket.send(upsertedInstance, ws_service_1.wsRoom[topic]);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        winston_1.default.info(prefix + "Sending Status to socket without strategy found");
                                        webSocket.send(upsertedInstance, ws_service_1.wsRoom[topic]);
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (error) { return winston_1.default.error(prefix + 'error dto instance: ' + error.message); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return BotEventsStatusHandler;
}());
exports.BotEventsStatusHandler = BotEventsStatusHandler;
//# sourceMappingURL=bot-events-status-handler.js.map