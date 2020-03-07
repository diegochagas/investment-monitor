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
var service_strategy_1 = require("../../../src/app/strategy/services/service.strategy");
var GarchStrategy_1 = require("../../../src/app/strategy/models/strategy/GarchStrategy");
var StrategyStatus_1 = require("../../../src/app/strategy/models/strategy/enums/StrategyStatus");
var Instance_1 = require("../../../src/app/commons/models/instance/Instance");
var Exchange_1 = require("../../../src/app/commons/models/exchange/Exchange");
jest.mock('../../../src/app/strategy/db/db');
jest.mock('../../../src/app/commons/db/db');
jest.mock('../../../src/shared/middlewares/winston');
var serviceGarch = new service_strategy_1.ServiceStrategy(GarchStrategy_1.GarchStrategy, GarchStrategy_1.StrategyGarchSchema);
describe('Test GARCH Strategy Service', function () {
    var _this = this;
    describe('>> CREATE <<', function () {
        test('#MOCK should return error when model is wrong', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var strategy, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strategy = {
                            "name": 'strategy-name',
                            "finPair": "USD",
                            "iniPair": "BTC",
                            "config": {
                                "candleTime": "1",
                                "usd": 15,
                                "tradeWindow": "4MIN",
                                "limitTrade": 1,
                                "orderType": "MARKET",
                                "expose": 50,
                                "fee": 0.002,
                                "stop": 0.02,
                                "maxCandlesBeforeCancel": 2,
                            },
                        };
                        return [4 /*yield*/, serviceGarch.createStrategy(strategy, {})];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(422);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('mock sucess', function () {
            var _this = this;
            test('#MOCK should create GarchStrategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var strategy, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            strategy = {
                                "name": "Teste",
                                "finPair": "USD",
                                "iniPair": "BTC",
                                "config": {
                                    "exchange": "abc",
                                    "candleTime": 1,
                                    "usd": 15,
                                    "tradeWindow": "4MIN",
                                    "limitTrade": 1,
                                    "orderType": "MARKET",
                                    "expose": 50,
                                    "fee": 0.002,
                                    "stop": 0.02,
                                    "maxCandlesBeforeCancel": 2,
                                    "takeProfit": 54,
                                    "idleMinutesAfterStop": 12,
                                    "stopLimit": 12,
                                    "stopLimitTrigger": 12
                                }
                            };
                            jest.spyOn(GarchStrategy_1.StrategyGarchSchema.prototype, 'save')
                                .mockImplementation(function () { return Promise.resolve(strategy); });
                            return [4 /*yield*/, serviceGarch.createStrategy(strategy, {})];
                        case 1:
                            response = _a.sent();
                            expect(response.statusCode).toBe(200);
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
            beforeEach(function () {
                mockExchange();
                mockEmptyStrategy();
            });
        });
        /*describe('mock empty exchange', () => {
            beforeEach(() => {
                mockEmptyExchange()
            });

            test('#MOCK should return error when exchange does not exist', async done => {
                const strategy = {
                    "name": "Test Exchange not found",

                    "config": {
                        "candleTime": 1,
                        "usd": 15,
                        "tradeWindow": "4MIN",
                        "limitTrade": 1,
                        "orderType": "MARKET",
                        "expose": 50,
                        "fee": 0.002,
                        "stop": 0.02,
                        "maxCandlesBeforeCancel": 2,
                    }
                } as any;

                jest.spyOn(StrategyGarchSchema.prototype, 'save')
                    .mockImplementation(() => Promise.resolve(strategy));

                const response = await ServiceStrategy.createStrategy(strategy, {});
                expect(response.statusCode).toBe(400);
                expect(response.internalCode).toBe('10003');
                expect(response.message).toBe('Exchange não encontrada');
                done()
            })
        });*/
        describe('mock strategy exist', function () {
            beforeEach(function () {
                mockStrategy();
                mockExchange();
            });
            test('#MOCK should return error when duplicate config', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var strategy, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            strategy = {
                                "name": "Kompler",
                                "finPair": "USD",
                                "iniPair": "BTC",
                                "config": {
                                    "exchange": "abc",
                                    "candleTime": 1,
                                    "usd": 15,
                                    "tradeWindow": "4MIN",
                                    "limitTrade": 1,
                                    "orderType": "MARKET",
                                    "expose": 50,
                                    "fee": 0.002,
                                    "stop": 0.02,
                                    "maxCandlesBeforeCancel": 2,
                                    "takeProfit": 5,
                                    "idleMinutesAfterStop": 12,
                                    "stopLimit": 12,
                                    "stopLimitTrigger": 12
                                }
                            };
                            jest.spyOn(GarchStrategy_1.StrategyGarchSchema.prototype, 'save')
                                .mockImplementation(function () { return Promise.resolve(strategy); });
                            return [4 /*yield*/, serviceGarch.createStrategy(strategy, {})];
                        case 1:
                            response = _a.sent();
                            expect(response.statusCode).toBe(400);
                            expect(response.internalCode).toBe('10000');
                            expect(response.message).toBe('Já existe uma Strategy com os mesmos valores parametrizados.');
                            done();
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('mock error', function () {
            beforeEach(function () {
                mockRejectExchange();
            });
            test('#MOCK should throw error when create Strategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var strategy, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            strategy = {
                                "name": "Teste Rafael agora vai 2",
                                "finPair": "USD",
                                "iniPair": "BTC",
                                "config": {
                                    "exchange": "5cefc63b83fb1d44603d0b0e",
                                    "currencyPair": "btcusd",
                                    "order": {
                                        "stepSize": 4,
                                        "minSpread": 0.05,
                                        "maxSpread": 0.1,
                                        "maxOrders": 4,
                                        "wallet": 1000,
                                        "orderSize": 0.3,
                                        "amountOrders": 100,
                                        "ordersInterval": 0.05,
                                        "fractionOrder": {
                                            "fractionPercent": 0.25,
                                            "fractionQuantity": 4
                                        },
                                        "midPriceType": "LAST_PRICE",
                                        "percentUpdate": {
                                            "ask": 0,
                                            "bid": 0
                                        }
                                    },
                                    "stopLoss": 5
                                }
                            };
                            return [4 /*yield*/, serviceGarch.createStrategy(strategy, {})];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            expect(e_1.statusCode).toBe(400);
                            expect(e_1.message).toBe('mock error');
                            return [3 /*break*/, 3];
                        case 3:
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('>> LIST <<', function () {
        test('#MOCK should get Strategies', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var strategy, mock, mockStrategyGarchSchema, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strategy = {
                            "_id": "5d1a3b9532a55134e052ff66",
                            "name": "TESTEIIII",
                            "createdBy": "API",
                            "status": "active",
                            "updatedBy": "",
                            "finPair": "USD",
                            "iniPair": "BTC",
                            "config": {
                                "candleTime": 1,
                                "usd": 15,
                                "tradeWindow": "4MIN",
                                "limitTrade": 1,
                                "orderType": "MARKET",
                                "expose": 50,
                                "fee": 0.002,
                                "stop": 0.02,
                                "maxCandlesBeforeCancel": 2,
                            },
                            "createdAt": "2019-07-01T16:57:57.865Z",
                            "updatedAt": "2019-07-01T16:57:57.865Z",
                            "md5": "4032356578a243d8661b4436a197035f",
                            "presentationName": "TESTEIIII-v.1",
                            "__v": 0
                        };
                        mock = Promise.resolve([strategy]);
                        mockStrategyGarchSchema = jest.fn();
                        mockStrategyGarchSchema.mockReturnValue(mock);
                        GarchStrategy_1.StrategyGarchSchema.find = mockStrategyGarchSchema.bind(GarchStrategy_1.StrategyGarchSchema);
                        return [4 /*yield*/, serviceGarch.getStrategies(StrategyStatus_1.StrategyStatus.ACTIVE, 'GARCH')];
                    case 1:
                        response = _a.sent();
                        expect(response.data[0]).toBe(strategy);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should get used Strategies', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var strategy, mockStrategy, mockStrategyGarchSchema, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strategy = {
                            "instance": "mm-node-1",
                            "_id": "5d1a3b9532a55134e052ff66",
                            "name": "TESTEIIII",
                            "createdBy": "API",
                            "status": "active",
                            "updatedBy": "",
                            "finPair": "USD",
                            "iniPair": "BTC",
                            "config": {
                                "candleTime": 1,
                                "usd": 15,
                                "tradeWindow": "4MIN",
                                "limitTrade": 1,
                                "orderType": "MARKET",
                                "expose": 50,
                                "fee": 0.002,
                                "stop": 0.02,
                                "maxCandlesBeforeCancel": 2,
                            },
                            "createdAt": "2019-07-01T16:57:57.865Z",
                            "updatedAt": "2019-07-01T16:57:57.865Z",
                            "md5": "4032356578a243d8661b4436a197035f",
                            "presentationName": "TESTEIIII-v.1",
                            "__v": 0
                        };
                        mockStrategy = Promise.resolve([strategy]);
                        mockStrategyGarchSchema = jest.fn();
                        mockStrategyGarchSchema.mockReturnValue(mockStrategy);
                        GarchStrategy_1.StrategyGarchSchema.find = mockStrategyGarchSchema.bind(GarchStrategy_1.StrategyGarchSchema);
                        return [4 /*yield*/, serviceGarch.getStrategies(StrategyStatus_1.StrategyStatus.ACTIVE, 'GARCH')];
                    case 1:
                        response = _a.sent();
                        response.data.forEach(function (res) {
                            expect(res.instance).toBeDefined();
                        });
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should throw error when get Strategies', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockStrategyGarchSchema, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = Promise.reject();
                        mockStrategyGarchSchema = jest.fn();
                        mockStrategyGarchSchema.mockReturnValue(mock);
                        GarchStrategy_1.StrategyGarchSchema.find = mockStrategyGarchSchema.bind(GarchStrategy_1.StrategyGarchSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, serviceGarch.getStrategies(StrategyStatus_1.StrategyStatus.ACTIVE, 'GARCH')];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        expect(err_1.statusCode).toBe(400);
                        expect(err_1.message).toBe('Error to get Strategies');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> GET <<', function () {
        test('#MOCK should get Strategy by id', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var strategy, mock, mockStrategyGarchSchema, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strategy = {
                            "_id": "5d1a3b9532a55134e052ff66",
                            "name": "TESTEIIII",
                            "finPair": "USD",
                            "iniPair": "BTC",
                            "createdBy": "API",
                            "status": "active",
                            "updatedBy": "",
                            "config": {
                                "candleTime": 1,
                                "usd": 15,
                                "tradeWindow": "4MIN",
                                "limitTrade": 1,
                                "orderType": "MARKET",
                                "expose": 50,
                                "fee": 0.002,
                                "stop": 0.02,
                                "maxCandlesBeforeCancel": 2,
                            },
                            "createdAt": "2019-07-01T16:57:57.865Z",
                            "updatedAt": "2019-07-01T16:57:57.865Z",
                            "md5": "4032356578a243d8661b4436a197035f",
                            "presentationName": "TESTEIIII-v.1",
                            "__v": 0
                        };
                        mock = {
                            exec: function () { return Promise.resolve(strategy); }
                        };
                        mockStrategyGarchSchema = jest.fn();
                        mockStrategyGarchSchema.mockReturnValue(mock);
                        GarchStrategy_1.StrategyGarchSchema.findById = mockStrategyGarchSchema.bind(GarchStrategy_1.StrategyGarchSchema);
                        return [4 /*yield*/, serviceGarch.getStrategiesById('5d1a3b9532a55134e052ff66')];
                    case 1:
                        response = _a.sent();
                        expect(response.data).toBe(strategy);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should throw error when get Strategy by id', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var strategy, mock, mockStrategyGarchSchema, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strategy = {
                            "_id": "5d1a3b9532a55134e052ff66",
                            "name": "TESTEIIII",
                            "createdBy": "API",
                            "status": "active",
                            "finPair": "USD",
                            "iniPair": "BTC",
                            "updatedBy": "",
                            "config": {
                                "candleTime": 1,
                                "usd": 15,
                                "tradeWindow": "4MIN",
                                "limitTrade": 1,
                                "orderType": "MARKET",
                                "expose": 50,
                                "fee": 0.002,
                                "stop": 0.02,
                                "maxCandlesBeforeCancel": 2,
                            },
                            "createdAt": "2019-07-01T16:57:57.865Z",
                            "updatedAt": "2019-07-01T16:57:57.865Z",
                            "md5": "4032356578a243d8661b4436a197035f",
                            "presentationName": "TESTEIIII-v.1",
                            "__v": 0
                        };
                        mock = {
                            exec: function () { return Promise.reject(strategy); }
                        };
                        mockStrategyGarchSchema = jest.fn();
                        mockStrategyGarchSchema.mockReturnValue(mock);
                        GarchStrategy_1.StrategyGarchSchema.findById = mockStrategyGarchSchema.bind(GarchStrategy_1.StrategyGarchSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, serviceGarch.getStrategiesById('5d1a3b9532a55134e052ff66')];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        expect(err_2.statusCode).toBe(400);
                        expect(err_2.message).toBe('Error to get Strategy');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> DELETE <<', function () {
        test('#MOCK should delete Strategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockDeleteStrategy, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockDeleteStrategy = jest.fn();
                        mockDeleteStrategy.mockReturnValue(Promise.resolve());
                        GarchStrategy_1.StrategyGarchSchema.deleteOne = mockDeleteStrategy.bind(GarchStrategy_1.StrategyGarchSchema);
                        return [4 /*yield*/, serviceGarch.deleteStrategy('id')];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.message).toBe('Delete complete');
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should throw error when delete Strategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockDeleteStrategy, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockDeleteStrategy = jest.fn();
                        mockDeleteStrategy.mockReturnValue(Promise.reject());
                        GarchStrategy_1.StrategyGarchSchema.deleteOne = mockDeleteStrategy.bind(GarchStrategy_1.StrategyGarchSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, serviceGarch.deleteStrategy('id')];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        expect(err_3.statusCode).toBe(400);
                        expect(err_3.message).toBe('Error to delete Strategy');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> UPDATE <<', function () {
        describe('disable', function () {
            test('#MOCK should disable Strategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var mockInstance, mockStrategy, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mockInstance = jest.fn();
                            mockInstance.mockReturnValue(Promise.resolve([]));
                            Instance_1.InstanceSchema.find = mockInstance.bind(Instance_1.InstanceSchema);
                            mockStrategy = jest.fn();
                            mockStrategy.mockReturnValue(Promise.resolve());
                            GarchStrategy_1.StrategyGarchSchema.updateOne = mockStrategy.bind(GarchStrategy_1.StrategyGarchSchema);
                            return [4 /*yield*/, serviceGarch.disableStrategy('id', {})];
                        case 1:
                            response = _a.sent();
                            expect(response.statusCode).toBe(200);
                            expect(response.message).toBe('Strategy disabled');
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('#MOCK should disable used Strategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var mockInstance, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mockInstance = jest.fn();
                            mockInstance.mockReturnValue(Promise.resolve([1]));
                            Instance_1.InstanceSchema.find = mockInstance.bind(Instance_1.InstanceSchema);
                            return [4 /*yield*/, serviceGarch.disableStrategy('id', {})];
                        case 1:
                            response = _a.sent();
                            expect(response.statusCode).toBe(400);
                            expect(response.message).toBe('Esta Strategy está ativa em outra Instância.');
                            expect(response.internalCode).toBe('10001');
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('#MOCK should throw error when disable Strategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var mockInstance, err_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mockInstance = jest.fn();
                            mockInstance.mockReturnValue(Promise.reject([1]));
                            Instance_1.InstanceSchema.find = mockInstance.bind(Instance_1.InstanceSchema);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, serviceGarch.disableStrategy('id', {})];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_4 = _a.sent();
                            expect(err_4.statusCode).toBe(400);
                            expect(err_4.message).toBe('unable to disable strategy');
                            return [3 /*break*/, 4];
                        case 4:
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('enable', function () {
            test('#MOCK should enable Strategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var mockStrategy, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mockStrategy = jest.fn();
                            mockStrategy.mockReturnValue(Promise.resolve());
                            GarchStrategy_1.StrategyGarchSchema.updateOne = mockStrategy.bind(GarchStrategy_1.StrategyGarchSchema);
                            return [4 /*yield*/, serviceGarch.enableStrategy('', {})];
                        case 1:
                            response = _a.sent();
                            expect(response.statusCode).toBe(200);
                            expect(response.message).toBe('Strategy enabled');
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('#MOCK should enable Strategy', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var mockStrategy, err_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mockStrategy = jest.fn();
                            mockStrategy.mockReturnValue(Promise.reject());
                            GarchStrategy_1.StrategyGarchSchema.updateOne = mockStrategy.bind(GarchStrategy_1.StrategyGarchSchema);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, serviceGarch.enableStrategy('', {})];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_5 = _a.sent();
                            expect(err_5.statusCode).toBe(400);
                            expect(err_5.message).toBe('unable to enable strategy');
                            return [3 /*break*/, 4];
                        case 4:
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
var mockRejectExchange = function () {
    var exchangeMock = {
        exec: function () { return Promise.reject({ message: 'mock error' }); }
    };
    var mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValue(exchangeMock);
    Exchange_1.ExchangeSchema.findById = mockStaticFind.bind(Exchange_1.ExchangeSchema);
};
var mockExchange = function () {
    var exchangeMock = {
        exec: function () {
            return Promise.resolve({
                maxConcurrentRequests: 1,
                minTimeBetweenRequests: 1,
                name: "binance"
            });
        }
    };
    var mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValue(exchangeMock);
    Exchange_1.ExchangeSchema.findById = mockStaticFind.bind(Exchange_1.ExchangeSchema);
};
var mockEmptyExchange = function () {
    var exchangeMock = {
        exec: function () {
            return Promise.resolve(false);
        }
    };
    var mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValue(exchangeMock);
    Exchange_1.ExchangeSchema.findById = mockStaticFind.bind(Exchange_1.ExchangeSchema);
};
var mockEmptyStrategy = function () {
    var strategyeMock = [];
    var strategy = {
        "name": "Teste Rafael agora vai 2",
        "finPair": "USD",
        "iniPair": "BTC",
        "config": {
            "exchange": "5cefc63b83fb1d44603d0b0e",
            "currencyPair": "btcusd",
            "order": {
                "stepSize": 4,
                "minSpread": 0.05,
                "maxSpread": 0.1,
                "maxOrders": 4,
                "wallet": 1000,
                "orderSize": 0.3,
                "amountOrders": 100,
                "ordersInterval": 0.05,
                "fractionOrder": {
                    "fractionPercent": 0.25,
                    "fractionQuantity": 4
                },
                "midPriceType": "LAST_PRICE",
                "percentUpdate": {
                    "ask": 0,
                    "bid": 0
                }
            },
            "stopLoss": 5
        }
    };
    var mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValueOnce(strategyeMock).mockReturnValueOnce([strategy]);
    GarchStrategy_1.StrategyGarchSchema.find = mockStaticFind.bind(GarchStrategy_1.StrategyGarchSchema);
};
var mockStrategy = function () {
    var strategy = {
        "name": "Teste Rafael agora vai 2",
        "finPair": "USD",
        "iniPair": "BTC",
        "config": {
            "exchange": "5cefc63b83fb1d44603d0b0e",
            "currencyPair": "btcusd",
            "order": {
                "stepSize": 4,
                "minSpread": 0.05,
                "maxSpread": 0.1,
                "maxOrders": 4,
                "wallet": 1000,
                "orderSize": 0.3,
                "amountOrders": 100,
                "ordersInterval": 0.05,
                "fractionOrder": {
                    "fractionPercent": 0.25,
                    "fractionQuantity": 4
                },
                "midPriceType": "LAST_PRICE",
                "percentUpdate": {
                    "ask": 0,
                    "bid": 0
                }
            },
            "stopLoss": 5
        }
    };
    var strategyeMock = [strategy];
    var mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValue(strategyeMock);
    GarchStrategy_1.StrategyGarchSchema.find = mockStaticFind.bind(GarchStrategy_1.StrategyGarchSchema);
};
afterAll(function () {
    jest.restoreAllMocks();
});
//# sourceMappingURL=strategy-garch.spec.js.map