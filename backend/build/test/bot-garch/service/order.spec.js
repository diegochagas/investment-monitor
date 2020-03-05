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
var Order_1 = require("../../../src/app/bot-garch/models/Order");
var service_order_1 = require("../../../src/app/bot-garch/services/service.order");
jest.mock('../../../src/shared/db/db-topic-persistent');
jest.mock('../../../src/shared/middlewares/winston');
describe('Test Service Order Garch', function () {
    describe('>> LIST << ', function () {
        test('#MOCK should get orders', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var order, mock, mockOrder, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = [
                            {
                                "_id": "5d5aa8333a757e0016f0ab56",
                                "action": "ORDERS",
                                "type": "GARCH",
                                "instance": "investimento.ai.garch",
                                "content": {
                                    "T": "trade",
                                    "type": "BUY",
                                    "trend": "S",
                                    "price": 11792.1,
                                    "qty": "0.012719",
                                    "band": 11797.6978923598,
                                    "stop": 11768.5158,
                                    "lp": 11793.21,
                                    "exId": 9368,
                                    "status": "OPEN",
                                    "priceIn": 11792.1,
                                    "timeIn": 1565282146000,
                                    "priceOut": 11834.39,
                                    "timeOut": 1565282240000
                                },
                                "strategy": {
                                    "name": "estrategia-teste",
                                    "version": 2
                                }
                            }
                        ];
                        mock = {
                            sort: function () { return Promise.resolve(order); }
                        };
                        mockOrder = jest.fn();
                        mockOrder.mockReturnValue(mock);
                        Order_1.OrderGarchSchema.find = mockOrder.bind(Order_1.OrderGarchSchema);
                        return [4 /*yield*/, service_order_1.ServiceOrder.getOrders(order[0].instance, {})];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data[0]).toEqual(order[0]);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should throw error when get orders', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockOrder, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = {
                            sort: function () { return { exec: function () { return Promise.reject({ message: 'mock error' }); } }; }
                        };
                        mockOrder = jest.fn();
                        mockOrder.mockReturnValue(mock);
                        Order_1.OrderGarchSchema.find = mockOrder.bind(Order_1.OrderGarchSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_order_1.ServiceOrder.getOrders('', {})];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1.message).toBe('Error to get Orders');
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