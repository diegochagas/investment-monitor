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
var service_metrics_telegram_1 = require("../../../src/app/bot-telegram/services/service.metrics-telegram");
var EventTelegram_1 = require("../../../src/app/bot-telegram/models/EventTelegram");
jest.mock('../../../src/shared/middlewares/winston');
describe("Test Service Metrics Sum Telegram", function () {
    describe(">> SUM <<", function () {
        test("ERROR STAR END DATE", function () { return __awaiter(_this, void 0, void 0, function () {
            var getSumError, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, service_metrics_telegram_1.ServiceMetricTelegram.getSumMetrics("telegram.signal", { start: 0, end: 0, groups: "" })];
                    case 1:
                        getSumError = _a.sent();
                        expect(getSumError.statusCode).not.toBe(200);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        expect(error_1.statusCode).toBe(400);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        test("Find not have GROUP", function () { return __awaiter(_this, void 0, void 0, function () {
            var getSum, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        jest.spyOn(EventTelegram_1.EventsTelegramSchema, "find").mockResolvedValue([]);
                        return [4 /*yield*/, service_metrics_telegram_1.ServiceMetricTelegram.getSumMetrics("telegram.signal", { start: 2, end: 1, groups: "" })];
                    case 1:
                        getSum = _a.sent();
                        expect(getSum.statusCode).toBe(200);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        expect(error_2.statusCode).toBe(200);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        test("Find have GROUP", function () { return __awaiter(_this, void 0, void 0, function () {
            var event_1, event2, event3, event4, event5, getSum, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        event_1 = new EventTelegram_1.EventsTelegramSchema();
                        event_1.content = { status: "CLOSE", uniqueId: "123" };
                        event2 = new EventTelegram_1.EventsTelegramSchema();
                        event2.content = { status: "OPEN", uniqueId: "123" };
                        event3 = new EventTelegram_1.EventsTelegramSchema();
                        event3.content = { status: "OPEN", uniqueId: "1234" };
                        event4 = new EventTelegram_1.EventsTelegramSchema();
                        event4.content = { status: "STOP", uniqueId: "1234" };
                        event5 = new EventTelegram_1.EventsTelegramSchema();
                        event5.content = { status: "OPEN", uniqueId: "12345" };
                        jest.spyOn(EventTelegram_1.EventsTelegramSchema, "find").mockResolvedValue([event_1, event2, event3, event4, event5]);
                        return [4 /*yield*/, service_metrics_telegram_1.ServiceMetricTelegram.getSumMetrics("telegram.signal", { start: 22, end: 12, groups: "teste,novo" })];
                    case 1:
                        getSum = _a.sent();
                        expect(getSum.statusCode).toBe(200);
                        expect(getSum.data.periodTrade).toBe(3);
                        expect(getSum.data.gains).toBe(1);
                        expect(getSum.data.losses).toBe(1);
                        expect(getSum.data.finishedTrades).toBe(2);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        expect(error_3.statusCode).toBe(200);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        test("Find error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mockFunc, errorGet, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFunc = jest.fn();
                        mockFunc.mockReturnValue(Promise.reject({ message: 'Error' }));
                        EventTelegram_1.EventsTelegramSchema.find = mockFunc.bind(EventTelegram_1.EventsTelegramSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_metrics_telegram_1.ServiceMetricTelegram.getSumMetrics('telegram.signal', { start: 2, end: 1, groups: "teste,novo" })];
                    case 2:
                        errorGet = _a.sent();
                        expect(errorGet.statusCode).not.toBe(200);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1.statusCode).toBe(400);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Teste Service Metrics Balances", function () {
        describe(">> BALANCES <<", function () {
            test("ERROR STAR END DATE", function () { return __awaiter(_this, void 0, void 0, function () {
                var getSumError, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, service_metrics_telegram_1.ServiceMetricTelegram.getChannelBalances("telegram.signal", { start: 0, end: 0 })];
                        case 1:
                            getSumError = _a.sent();
                            expect(getSumError.statusCode).not.toBe(200);
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            expect(error_4.statusCode).toBe(400);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        });
        test("Calculate Balances", function () { return __awaiter(_this, void 0, void 0, function () {
            var event_2, event2, event3, event4, event5, getBalances, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        event_2 = new EventTelegram_1.EventsTelegramSchema();
                        event_2.content = { status: "CLOSE", BTCBuyQty: 1.7, channel: "CQS" };
                        event_2.timestamp = Date.now();
                        event2 = new EventTelegram_1.EventsTelegramSchema();
                        event2.content = { status: "OPEN", BTCSellQty: 1, channel: "CQS" };
                        event2.timestamp = Date.now();
                        event3 = new EventTelegram_1.EventsTelegramSchema();
                        event3.content = { status: "OPEN", BTCSellQty: 1, channel: "4C" };
                        event3.timestamp = Date.now();
                        event4 = new EventTelegram_1.EventsTelegramSchema();
                        event4.content = { status: "STOP", BTCSellQty: 0.75, channel: "4C" };
                        event4.timestamp = Date.now();
                        event5 = new EventTelegram_1.EventsTelegramSchema();
                        event5.content = { status: "OPEN", BTCSellQty: 1, channel: "CQS" };
                        event5.timestamp = Date.now();
                        jest.spyOn(EventTelegram_1.EventsTelegramSchema, "find").mockResolvedValue([event_2, event2, event3, event4, event5]);
                        return [4 /*yield*/, service_metrics_telegram_1.ServiceMetricTelegram.getChannelBalances("telegram.signal", { start: 2, end: 1 })];
                    case 1:
                        getBalances = _a.sent();
                        expect(getBalances.statusCode).toBe(200);
                        expect(getBalances.data.length).toBe(2);
                        expect(getBalances.data[0].name).toBe("CQS");
                        expect(getBalances.data[1].name).toBe("4C");
                        expect(getBalances.data[0].data.length).toBe(3);
                        expect(getBalances.data[1].data.length).toBe(2);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        expect(error_5.statusCode).toBe(200);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        test("Find error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mockFunc, errorGet, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFunc = jest.fn();
                        mockFunc.mockReturnValue(Promise.reject({ message: 'Error' }));
                        EventTelegram_1.EventsTelegramSchema.find = mockFunc.bind(EventTelegram_1.EventsTelegramSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_metrics_telegram_1.ServiceMetricTelegram.getChannelBalances('telegram.signal', { start: 2, end: 1 })];
                    case 2:
                        errorGet = _a.sent();
                        expect(errorGet.statusCode).not.toBe(200);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(e_2.statusCode).toBe(400);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=service-metrics-telegram.spec.js.map