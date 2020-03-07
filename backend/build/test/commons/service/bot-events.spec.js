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
var BotEvents_1 = require("../../../src/app/commons/models/bot-events/BotEvents");
var service_bot_events_1 = require("../../../src/app/commons/services/service.bot-events");
jest.mock('../../../src/app/commons/db/db');
jest.mock('../../../src/shared/middlewares/winston');
describe('#Test Bot Events Service', function () {
    describe('>> LIST <<', function () {
        test('#MOCK should get Event', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockStaticFind, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = {
                            "statusCode": 200,
                            "data": {
                                "_id": "5d5d9c567ca589b6f04009e9",
                                "type": "INDICATORS_MARKET_MAKER_INVESTIMENTO.BINANCE_BTC_USD",
                                "__v": 0,
                                "createdAt": "2019-08-21T19:32:37.491Z",
                                "data": {
                                    "smartSize": {
                                        "deltaP": 0,
                                        "deltaPPercent": 0,
                                        "avgPrice": 0,
                                        "exposition": {
                                            "amount": {
                                                "currency": 0,
                                                "symbol": 0
                                            },
                                            "percent": 0,
                                            "spread": 0,
                                            "sizeMultiply": 0
                                        }
                                    },
                                    "balance": {
                                        "balance": {
                                            "symbol": 1000000,
                                            "currency": 7999999.99999999
                                        },
                                        "bids": {
                                            "BTC": 1000000,
                                            "USD": 789.9572731859856
                                        },
                                        "asks": {
                                            "BTC": 1000000,
                                            "USD": 789.956493146139
                                        },
                                        "average": {
                                            "BTC": 1000000,
                                            "USD": 789.9568831660623
                                        },
                                        "totalBalance": 1000789.9568831661
                                    },
                                    "midPrice": 0
                                },
                                "updatedAt": "2019-08-21T19:32:37.491Z"
                            }
                        };
                        mockStaticFind = jest.fn();
                        mockStaticFind.mockReturnValue(Promise.resolve(mock));
                        BotEvents_1.BotEventsSchema.findOne = mockStaticFind.bind(BotEvents_1.BotEventsSchema);
                        return [4 /*yield*/, service_bot_events_1.ServiceBotEvents.getEvent('marketmaker', { type: 'INDICATOR', instance: 'investimento.binance_btc_usd' })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data.data).toEqual(mock.data);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should error when get Instances', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockStaticFind, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockStaticFind = jest.fn();
                        mockStaticFind.mockReturnValue(Promise.reject(''));
                        BotEvents_1.BotEventsSchema.findOne = mockStaticFind.bind(BotEvents_1.BotEventsSchema);
                        return [4 /*yield*/, service_bot_events_1.ServiceBotEvents.getEvent('marketmaker', { type: 'INDICATOR', instance: 'investimento.binance_btc_usd' })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(400);
                        expect(response.message).toBe('Não foi possível obter os dados.');
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=bot-events.spec.js.map