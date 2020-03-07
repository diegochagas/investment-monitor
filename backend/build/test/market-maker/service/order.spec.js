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
var Order_1 = require("../../../src/app/market-maker/models/Order");
var service_order_1 = require("../../../src/app/market-maker/services/service.order");
jest.mock('../../../src/app/market-maker/db/db');
describe('Test Service Order', function () {
    describe('>> LIST << ', function () {
        test('#MOCK should get dashboard', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var order, dash, mock, mockOrder, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = [
                            {
                                "_id": "5cdd6bd19f1cef01878d3bcd",
                                "strategy": "Market Maker",
                                "exchange": "BINANCE",
                                "market": "BTC_USDT",
                                "symbol": "BTC",
                                "currency": "USDT",
                                "orderID": "368232775",
                                "guID": "368232775.atlas01@binance",
                                "price": 7811.78,
                                "quantity": 20.43561648,
                                "fee": 2.62e-06,
                                "side": "BUY",
                                "status": "CANCELED",
                                "timestamp": 1558014929416.0,
                                "timestampUpdate": 1558014999300.0,
                                "synchronize": false,
                                "instance": "I2ex"
                            },
                            {
                                "_id": "5cdd6bd39f1cef01878d3bd1",
                                "strategy": "Market Maker",
                                "exchange": "BINANCE",
                                "market": "BTC_USDT",
                                "symbol": "BTC",
                                "currency": "USDT",
                                "orderID": "368232801",
                                "guID": "368232801.atlas01@binance",
                                "price": 7843.09,
                                "quantity": 20.49399417,
                                "fee": 0.020494,
                                "side": "SELL",
                                "status": "OPEN",
                                "timestamp": 1558014931395.0,
                                "timestampUpdate": 1558014931395.0,
                                "synchronize": false,
                                "instance": "mm-node-01"
                            },
                            {
                                "_id": "5cdd6bd19f1cef01878d3bce",
                                "strategy": "Market Maker",
                                "exchange": "BINANCE",
                                "market": "BTC_USDT",
                                "symbol": "BTC",
                                "currency": "USDT",
                                "orderID": "368232785",
                                "guID": "368232785.atlas01@binance",
                                "price": 7811,
                                "quantity": 21.456817,
                                "fee": 2.75e-06,
                                "side": "BUY",
                                "status": "CANCELED",
                                "timestamp": 1558014929422.0,
                                "timestampUpdate": 1558014976471.0,
                                "synchronize": false,
                                "instance": "mm-node-01"
                            },
                            {
                                "_id": "5cdd6bd39f1cef01878d3bd1",
                                "strategy": "Market Maker",
                                "exchange": "BINANCE",
                                "market": "BTC_USDT",
                                "symbol": "BTC",
                                "currency": "USDT",
                                "orderID": "368232801",
                                "guID": "368232801.atlas01@binance",
                                "price": 7843.09,
                                "quantity": 20.49399417,
                                "fee": 0.020494,
                                "side": "SELL",
                                "status": "OPEN",
                                "timestamp": 1558014931395.0,
                                "timestampUpdate": 1558014931395.0,
                                "synchronize": false,
                                "instance": "mm-node-01"
                            },
                            {
                                "_id": "5cdd6bd39f1cef01878d3bd2",
                                "strategy": "Market Maker",
                                "exchange": "BINANCE",
                                "market": "BTC_USDT",
                                "symbol": "BTC",
                                "currency": "USDT",
                                "orderID": "368232842",
                                "guID": "368232842.atlas01@binance",
                                "price": 7843.87,
                                "quantity": 21.52357928,
                                "fee": 0.02152358,
                                "side": "SELL",
                                "status": "OPEN",
                                "timestamp": 1558014931395.0,
                                "timestampUpdate": 1558014931395.0,
                                "synchronize": false,
                                "instance": "mm-node-01"
                            },
                            {
                                "_id": "5cdd6bdd9f1cef01878d3bd6",
                                "strategy": "Market Maker",
                                "exchange": "BINANCE",
                                "market": "BTC_USDT",
                                "symbol": "BTC",
                                "currency": "USDT",
                                "orderID": "368233023",
                                "guID": "368233023.atlas01@binance",
                                "price": 7811.8,
                                "quantity": 20.4356688,
                                "fee": 2.62e-06,
                                "side": "SELL",
                                "status": "CANCELED",
                                "timestamp": 1558014941331.0,
                                "timestampUpdate": 1558014996196.0,
                                "instance": "mm-node-01"
                            },
                            {
                                "_id": "5cdd6bde9f1cef01878d3bd8",
                                "strategy": "Market Maker",
                                "exchange": "BINANCE",
                                "market": "BTC_USDT",
                                "symbol": "BTC",
                                "currency": "USDT",
                                "orderID": "368233050",
                                "guID": "368233050.atlas01@binance",
                                "price": 7844.65,
                                "quantity": 20.49807044,
                                "fee": 0.02049808,
                                "side": "BUY",
                                "status": "OPEN",
                                "timestamp": 1558014942456.0,
                                "timestampUpdate": 1558014942456.0,
                                "instance": "mm-node-01"
                            },
                            {
                                "_id": "5cdd6be29f1cef01878d3bdb",
                                "strategy": "Market Maker",
                                "exchange": "BINANCE",
                                "market": "BTC_USDT",
                                "symbol": "BTC",
                                "currency": "USDT",
                                "orderID": "368233142",
                                "guID": "368233142.atlas01@binance",
                                "price": 7813.32,
                                "quantity": 20.43964512,
                                "fee": 2.62e-06,
                                "side": "SELL",
                                "status": "CANCELED",
                                "timestamp": 1558014945279.0,
                                "timestampUpdate": 1558015056148.0,
                                "instance": "mm-node-01"
                            },
                        ];
                        dash = {
                            "_id": "5cdd6bd19f1cef01878d3bcd",
                            "strategy": "Market Maker",
                            "exchange": "BINANCE",
                            "market": "BTC_USDT",
                            "symbol": "BTC",
                            "currency": "USDT",
                            "orderID": "368232775",
                            "guID": "368232775.atlas01@binance",
                            "price": 7811.78,
                            "quantity": 20.43561648,
                            "fee": 2.62e-06,
                            "side": "BUY",
                            "status": "CANCELED",
                            "timestamp": 1558014929416.0,
                            "timestampUpdate": 1558014999300.0,
                            "synchronize": false,
                            "instance": "I2ex"
                        };
                        mock = {
                            sort: function () { return { exec: function () { return Promise.resolve(order); } }; }
                        };
                        mockOrder = jest.fn();
                        mockOrder.mockReturnValue(mock);
                        Order_1.OrderSchema.find = mockOrder.bind(Order_1.OrderSchema);
                        return [4 /*yield*/, new service_order_1.ServiceOrder().getDashOrders(order[0].instance, {})];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data[0]).toEqual(dash);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should throw error when get dashboard', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockOrder, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = {
                            sort: function () { return { exec: function () { return Promise.reject({ message: 'mock error' }); } }; }
                        };
                        mockOrder = jest.fn();
                        mockOrder.mockReturnValue(mock);
                        Order_1.OrderSchema.find = mockOrder.bind(Order_1.OrderSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new service_order_1.ServiceOrder().getDashOrders('', {})];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1.message).toBe('mock error');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> CREATE <<', function () {
        test('#MOCK should create order', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = {
                            "_id": "5d0931d4c6b563030c5fc73b",
                            "strategy": "Market Maker",
                            "exchange": "BINANCE",
                            "market": "BTC_USDT",
                            "symbol": "BTC",
                            "currency": "USDT",
                            "orderID": "368232775",
                            "guID": "368232775.atlas01@binance",
                            "price": 7811.78,
                            "quantity": 20.43561648,
                            "fee": 0.00000262,
                            "side": "BUY",
                            "status": "CANCELED",
                            "timestamp": 1558014929416,
                            "timestampUpdate": 1558014999300,
                            "createdAt": "2019-06-18T18:47:48.582Z",
                            quantitySymbol: 2,
                            "updatedAt": "2019-06-18T18:47:48.582Z",
                            "__v": 0
                        };
                        jest.spyOn(Order_1.OrderSchema.prototype, 'save')
                            .mockImplementation(function () { return order; });
                        return [4 /*yield*/, new service_order_1.ServiceOrder().createOrder(order)];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should throw error when model is wrong', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = {
                            "_id": "5d0931d4c6b563030c5fc73b",
                            "strategy": "Market Maker",
                            "exchange": "BINANCE",
                            "market": "BTC_USDT",
                            "symbol": "BTC",
                            "currency": "USDT",
                            "orderID": "368232775",
                            "guID": "368232775.atlas01@binance",
                            "price": "7811.78",
                            "quantity": 20.43561648,
                            "fee": 0.00000262,
                            "side": "BUY",
                            "status": "CANCELED",
                            "timestamp": 1558014929416,
                            "timestampUpdate": 1558014999300,
                            quantitySymbol: 2,
                            "createdAt": "2019-06-18T18:47:48.582Z",
                            "updatedAt": "2019-06-18T18:47:48.582Z",
                            "__v": 0
                        };
                        jest.spyOn(new Order_1.OrderSchema, 'save')
                            .mockImplementation(function () { return order; });
                        return [4 /*yield*/, new service_order_1.ServiceOrder().createOrder(order)];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(422);
                        expect(response.data).toEqual([{
                                property: 'price',
                                value: '7811.78',
                                status: ['price must be a number']
                            }]);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should throw error when create order', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(new Order_1.OrderSchema, 'save')
                            .mockImplementation(function () { return Promise.reject(); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new service_order_1.ServiceOrder().createOrder({})];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(e_2.statusCode).toBe(400);
                        expect(e_2.message).toBe('Unable to create order');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
afterAll(function () {
    jest.restoreAllMocks();
});
//# sourceMappingURL=order.spec.js.map