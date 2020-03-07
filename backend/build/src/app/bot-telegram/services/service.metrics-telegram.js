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
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var EventTelegram_1 = require("../models/EventTelegram");
var Actions_1 = require("../models/enums/Actions");
var ContentStatus_1 = require("../models/enums/ContentStatus");
var ServiceMetricTelegram = /** @class */ (function () {
    function ServiceMetricTelegram() {
    }
    ServiceMetricTelegram.getSumMetrics = function (instance, query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, splitGroups, findData, filterOpen, filterNotOpen_1, stop_1, close_1, activeTrade, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!query.start || !query.end) {
                            throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get sumMetrics start and end is required');
                        }
                        filter = { instance: instance };
                        filter.timestamp = { $gte: query.start, $lt: query.end };
                        filter.action = Actions_1.Action.ORDERS;
                        if (query.groups) {
                            splitGroups = query.groups.split(',');
                            filter["content.channel"] = { $in: splitGroups };
                        }
                        return [4 /*yield*/, EventTelegram_1.EventsTelegramSchema.find(filter, { content: 1, action: 1 })];
                    case 1:
                        findData = _a.sent();
                        filterOpen = findData.filter(function (element) { return element.content.status == ContentStatus_1.ContentStatus.OPEN; });
                        filterNotOpen_1 = findData.filter(function (element) { return element.content.status !== ContentStatus_1.ContentStatus.OPEN; });
                        stop_1 = 0;
                        close_1 = 0;
                        filterOpen.forEach(function (elementOpen) {
                            filterNotOpen_1.forEach(function (elementNotOpen) {
                                if (elementOpen.content.uniqueId == elementNotOpen.content.uniqueId) {
                                    if (elementNotOpen.content.status == ContentStatus_1.ContentStatus.STOP) {
                                        stop_1 += 1;
                                    }
                                    if (elementNotOpen.content.status == ContentStatus_1.ContentStatus.CLOSE) {
                                        close_1 += 1;
                                    }
                                }
                            });
                        });
                        activeTrade = filterOpen.length - (stop_1 + close_1);
                        response = {
                            periodTrade: filterOpen.length,
                            activeTrade: activeTrade,
                            gains: close_1,
                            losses: stop_1,
                            finishedTrades: stop_1 + close_1
                        };
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response, 'Success count data')];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_1;
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get sumMetrics');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceMetricTelegram.getChannelBalances = function (instance, query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, findData, responseToObject_1, responseToArray_1, keys, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!query.start || !query.end) {
                            throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get balances start and end is required');
                        }
                        filter = { instance: instance };
                        filter.timestamp = { $gte: query.start, $lt: query.end };
                        filter.action = Actions_1.Action.ORDERS;
                        return [4 /*yield*/, EventTelegram_1.EventsTelegramSchema.find(filter, { content: 1, timestamp: 1, action: 1 })];
                    case 1:
                        findData = _a.sent();
                        responseToObject_1 = {};
                        findData.forEach(function (element) {
                            if (element.content.status == ContentStatus_1.ContentStatus.OPEN) {
                                if (!responseToObject_1[element.content.channel]) {
                                    responseToObject_1[element.content.channel] = [];
                                    responseToObject_1[element.content.channel].push([element.timestamp, element.content.BTCSellQty * -1]);
                                }
                                else {
                                    responseToObject_1[element.content.channel].push([element.timestamp, element.content.BTCSellQty * -1]);
                                }
                            }
                            else if (element.content.status == ContentStatus_1.ContentStatus.CLOSE || element.content.status == ContentStatus_1.ContentStatus.STOP) {
                                if (!responseToObject_1[element.content.channel]) {
                                    responseToObject_1[element.content.channel] = [];
                                    responseToObject_1[element.content.channel].push([element.timestamp, element.content.BTCBuyQty]);
                                }
                                else {
                                    responseToObject_1[element.content.channel].push([element.timestamp, element.content.BTCBuyQty]);
                                }
                            }
                        });
                        responseToArray_1 = [];
                        keys = Object.keys(responseToObject_1);
                        keys.forEach(function (element) {
                            responseToArray_1.push({ name: element, data: responseToObject_1[element] });
                        });
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, responseToArray_1)];
                    case 2:
                        e_2 = _a.sent();
                        if (e_2 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_2;
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get sumMetrics');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceMetricTelegram;
}());
exports.ServiceMetricTelegram = ServiceMetricTelegram;
//# sourceMappingURL=service.metrics-telegram.js.map