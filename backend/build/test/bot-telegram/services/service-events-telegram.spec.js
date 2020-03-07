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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var EventTelegram_1 = require("../../../src/app/bot-telegram/models/EventTelegram");
var service_events_telegram_1 = require("../../../src/app/bot-telegram/services/service.events-telegram");
var ApplicationResponse_1 = require("../../../src/shared/models/ApplicationResponse");
jest.mock('../../../src/shared/db/db-topic-persistent');
describe('Test Service Events Telegram', function () {
    describe('>> LIST <<', function () {
        test('should return Indicators items', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var order, mock, mockFunc, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = {
                            "_id": "5d650349cd67520012ff3ba9",
                            "type": "TELEGRAM",
                            "action": "ORDERS",
                            "instance": "telegram.signal",
                            "strategy": {
                                "name": "Telegram Default2",
                                "version": 1
                            },
                            "timestamp": 1566901065000,
                            "content": {
                                "T": "trade",
                                "typeEX": "SELL",
                                "buyMin": "0.00009851",
                                "buyMax": "0.00010019",
                                "qty": 36.74,
                                "stop": "0.00009273",
                                "targets": [
                                    "0.00010614",
                                    "0.00011309"
                                ],
                                "pair": "NANOBTC",
                                "step": 2,
                                "channel": "jorgetelegram2",
                                "uniqueId": "fe65342c084f45e4825fba4f7788b867",
                                "type": "C",
                                "price": 0.0000998,
                                "exId": 89428574,
                                "status": "CLOSE",
                                "priceIn": 0.0000999,
                                "timeIn": 1566840197000,
                                "qtdTagets": 3,
                                "initQty": 55.11,
                                "priceOut": 0.0001022,
                                "timeOut": 1566901065000,
                                "fee": 0
                            }
                        };
                        mock = {
                            sort: function () { return Promise.resolve(order); }
                        };
                        mockFunc = jest.fn();
                        mockFunc.mockReturnValue(mock);
                        EventTelegram_1.EventsTelegramSchema.find = mockFunc.bind(EventTelegram_1.EventsTelegramSchema);
                        return [4 /*yield*/, service_events_telegram_1.ServiceEventsTelegram.getEvents('telegram.signal', {
                                action: 'INDICATORS',
                                limit: "50",
                                page: "1",
                                status: "OPEN"
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data).toEqual(order);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return error when getEvents', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockFunc, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFunc = jest.fn();
                        mockFunc.mockReturnValue({ sort: function () { return Promise.reject({ message: 'Error' }); } });
                        EventTelegram_1.EventsTelegramSchema.find = mockFunc.bind(EventTelegram_1.EventsTelegramSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_events_telegram_1.ServiceEventsTelegram.getEvents('telegram.signal', { action: 'INDICATORS', limit: "50", page: "1", status: "" })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1.statusCode).toBe(400);
                        expect(e_1.message).toEqual('Error to get Events');
                        done();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        test('should return ApplicationResponse error when getEvents', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockFunc, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFunc = jest.fn();
                        mockFunc.mockReturnValue({ sort: function () { return Promise.reject(new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get Events')); } });
                        EventTelegram_1.EventsTelegramSchema.find = mockFunc.bind(EventTelegram_1.EventsTelegramSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_events_telegram_1.ServiceEventsTelegram.getEvents('telegram.signal', { action: 'INDICATORS', limit: "50", page: "1", status: "" })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(e_2.statusCode).toBe(400);
                        expect(e_2.message).toEqual('Error to get Events');
                        done();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=service-events-telegram.spec.js.map