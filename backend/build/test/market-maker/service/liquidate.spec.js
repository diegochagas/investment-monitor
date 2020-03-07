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
var service_liquidate_1 = require("../../../src/app/market-maker/services/service.liquidate");
var Order_1 = require("../../../src/app/market-maker/models/Order");
jest.mock('../../../src/shared/middlewares/winston');
jest.mock('../../../src/app/market-maker/db/db');
jest.mock('../../../src/infra/kafka/kafka-producer');
describe('Test Service Liquidate', function () {
    var service = new service_liquidate_1.ServiceLiquidate();
    test('should return error when params is wrong', function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                service.liquidExposition('NULL', 1, 'instance', { name: 'strategy', version: 1 });
            }
            catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe('Insuficient parameters');
            }
            done();
            return [2 /*return*/];
        });
    }); });
    test('should return sucess when dont find orders to liquidate', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var mock, mockOrder, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mock = {
                        sort: function () { return Promise.resolve([]); }
                    };
                    mockOrder = jest.fn();
                    mockOrder.mockReturnValue(mock);
                    Order_1.OrderSchema.find = mockOrder.bind(Order_1.OrderSchema);
                    return [4 /*yield*/, new service_liquidate_1.ServiceLiquidate().liquidExposition('BUY', 2, 'instance', { name: 'strategy', version: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.data).toEqual({
                        amountLiquidated: 0,
                        leftLiquidate: 2,
                        message: "No has Orders to liquidate"
                    });
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('should throw error ', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var mock, mockOrder, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mock = {
                        sort: function () { return Promise.reject({ message: 'error to find' }); }
                    };
                    mockOrder = jest.fn();
                    mockOrder.mockReturnValue(mock);
                    Order_1.OrderSchema.find = mockOrder.bind(Order_1.OrderSchema);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new service_liquidate_1.ServiceLiquidate().liquidExposition('BUY', 2, 'instance', { name: 'strategy', version: 1 })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    expect(e_1.statusCode).toBe(400);
                    expect(e_1.message).toBe('error to find');
                    return [3 /*break*/, 4];
                case 4:
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('should liquidate all orders because orders sum is less then value to liquidate', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var mock, mockFind, mockUpdate, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mock = {
                        sort: function () { return Promise.resolve([{
                                "_id": "5cdc2615a9fbf2033e5b7028",
                                "strategy": "MM1",
                                "exchange": "BITFINEX",
                                "market": "BTC_USD",
                                "symbol": "BTC",
                                "currency": "USD",
                                "orderID": "25252199081",
                                "guID": "25252199081.atlas01@bitfinex",
                                "price": 7917.1,
                                "quantity": 10.58642944,
                                "fee": 2.68e-06,
                                "side": "BUY",
                                "status": "EXECUTED",
                                "timestamp": 1557931541364.0,
                                "timestampUpdate": 1558096411877.0,
                                "synchronize": true,
                                "quantitySymbol": 1.5,
                                "version": 1.0,
                                "instance": "instance",
                                "liquidateValue": null,
                            }]); }
                    };
                    mockFind = jest.fn();
                    mockFind.mockReturnValue(mock);
                    Order_1.OrderSchema.find = mockFind.bind(Order_1.OrderSchema);
                    mockUpdate = jest.fn();
                    mockUpdate.mockReturnValue(Promise.resolve());
                    Order_1.OrderSchema.updateMany = mockUpdate.bind(Order_1.OrderSchema);
                    return [4 /*yield*/, new service_liquidate_1.ServiceLiquidate().liquidExposition('BUY', 2, 'instance', { name: 'strategy', version: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.data).toEqual({
                        amountLiquidated: 1.5,
                        leftLiquidate: 0.5,
                        message: "Amount orders is less then value to liquidate, all orders was liquidated"
                    });
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('shoud partially to liquidate an order', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var mock, mockFind, mockUpdate, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mock = {
                        sort: function () { return Promise.resolve([{
                                "_id": "5cdc2615a9fbf2033e5b7028",
                                "strategy": "MM1",
                                "exchange": "BITFINEX",
                                "market": "BTC_USD",
                                "symbol": "BTC",
                                "currency": "USD",
                                "orderID": "25252199081",
                                "guID": "25252199081.atlas01@bitfinex",
                                "price": 7917.1,
                                "quantity": 10.58642944,
                                "fee": 2.68e-06,
                                "side": "BUY",
                                "status": "EXECUTED",
                                "timestamp": 1557931541364.0,
                                "timestampUpdate": 1558096411877.0,
                                "synchronize": true,
                                "quantitySymbol": 1.5,
                                "version": 1.0,
                                "instance": "instance",
                                "liquidateValue": null,
                            }]); }
                    };
                    mockFind = jest.fn();
                    mockFind.mockReturnValue(mock);
                    Order_1.OrderSchema.find = mockFind.bind(Order_1.OrderSchema);
                    mockUpdate = jest.fn();
                    mockUpdate.mockReturnValue(Promise.resolve());
                    Order_1.OrderSchema.updateMany = mockUpdate.bind(Order_1.OrderSchema);
                    Order_1.OrderSchema.update = mockUpdate.bind(Order_1.OrderSchema);
                    return [4 /*yield*/, new service_liquidate_1.ServiceLiquidate().liquidExposition('BUY', 1, 'instance', { name: 'strategy', version: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.data).toEqual({
                        amountLiquidated: 0.5,
                        leftLiquidate: 0.5,
                    });
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('shoud to liquidate an order', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var mock, mockFind, mockUpdate, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mock = {
                        sort: function () { return Promise.resolve([{
                                "_id": "5cdc2615a9fbf2033e5b7028",
                                "strategy": "MM1",
                                "exchange": "BITFINEX",
                                "market": "BTC_USD",
                                "symbol": "BTC",
                                "currency": "USD",
                                "orderID": "25252199081",
                                "guID": "25252199081.atlas01@bitfinex",
                                "price": 7917.1,
                                "quantity": 10.58642944,
                                "fee": 2.68e-06,
                                "side": "BUY",
                                "status": "EXECUTED",
                                "timestamp": 1557931541364.0,
                                "timestampUpdate": 1558096411877.0,
                                "synchronize": true,
                                "quantitySymbol": 1,
                                "version": 1.0,
                                "instance": "instance",
                                "liquidateValue": null,
                            }]); }
                    };
                    mockFind = jest.fn();
                    mockFind.mockReturnValue(mock);
                    Order_1.OrderSchema.find = mockFind.bind(Order_1.OrderSchema);
                    mockUpdate = jest.fn();
                    mockUpdate.mockReturnValue(Promise.resolve());
                    Order_1.OrderSchema.updateMany = mockUpdate.bind(Order_1.OrderSchema);
                    Order_1.OrderSchema.update = mockUpdate.bind(Order_1.OrderSchema);
                    return [4 /*yield*/, new service_liquidate_1.ServiceLiquidate().liquidExposition('BUY', 1, 'instance', { name: 'strategy', version: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.data).toEqual({
                        amountLiquidated: 1,
                        leftLiquidate: 0,
                    });
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('shoud to liquidate an order partially liquidated', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var mock, mockFind, mockUpdate, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mock = {
                        sort: function () { return Promise.resolve([{
                                "_id": "5cdc2615a9fbf2033e5b7028",
                                "strategy": "MM1",
                                "exchange": "BITFINEX",
                                "market": "BTC_USD",
                                "symbol": "BTC",
                                "currency": "USD",
                                "orderID": "25252199081",
                                "guID": "25252199081.atlas01@bitfinex",
                                "price": 7917.1,
                                "quantity": 10.58642944,
                                "fee": 2.68e-06,
                                "side": "BUY",
                                "status": "PARTIALLY_LIQUIDATE",
                                "timestamp": 1557931541364.0,
                                "timestampUpdate": 1558096411877.0,
                                "synchronize": true,
                                "quantitySymbol": 1.5,
                                "version": 1.0,
                                "instance": "instance",
                                "liquidateValue": 1,
                            }]); }
                    };
                    mockFind = jest.fn();
                    mockFind.mockReturnValue(mock);
                    Order_1.OrderSchema.find = mockFind.bind(Order_1.OrderSchema);
                    mockUpdate = jest.fn();
                    mockUpdate.mockReturnValue(Promise.resolve());
                    Order_1.OrderSchema.updateMany = mockUpdate.bind(Order_1.OrderSchema);
                    Order_1.OrderSchema.update = mockUpdate.bind(Order_1.OrderSchema);
                    return [4 /*yield*/, new service_liquidate_1.ServiceLiquidate().liquidExposition('BUY', 1, 'instance', { name: 'strategy', version: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.data).toEqual({
                        amountLiquidated: 1,
                        leftLiquidate: 0,
                    });
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=liquidate.spec.js.map