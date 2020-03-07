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
var Order_1 = require("../models/Order");
var winston_1 = __importDefault(require("../../../shared/middlewares/winston"));
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var projectName_1 = require("../../../shared/models/enum/projectName");
var Topic_1 = require("../../../shared/models/enum/Topic");
var kafka_producer_1 = require("../../../infra/kafka/kafka-producer");
var number_precision_1 = __importDefault(require("number-precision"));
var prefix = "SERVICE_LIQUIDATE => ";
var ServiceLiquidate = /** @class */ (function () {
    function ServiceLiquidate() {
    }
    ServiceLiquidate.prototype.liquidExposition = function (side, valueToLiquidate, instance, strategy) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, map, totalQuantitySymbols, partiallyLiquidate, orderIdsToLiquidate, sum, index, restValue, orderIdToLiquidatePartially, filter, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        if (!((side === 'BUY' || side === 'SELL') && instance && strategy))
                            throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Insuficient parameters');
                        return [4 /*yield*/, Order_1.OrderSchema.find({ instance: instance, strategy: strategy.name, version: strategy.version, side: side, $or: [{ status: Order_1.OrderStatus.EXECUTED }, { status: Order_1.OrderStatus.PARTIALLY_LIQUIDATE }] }).sort({ timestamp: 1 })];
                    case 1:
                        orders = _a.sent();
                        if (orders.length === 0)
                            return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, {
                                    amountLiquidated: 0,
                                    leftLiquidate: valueToLiquidate,
                                    message: "No has Orders to liquidate"
                                })];
                        map = orders.map(function (order) { return order.status === Order_1.OrderStatus.PARTIALLY_LIQUIDATE ? order.liquidateValue : order.quantitySymbol; });
                        totalQuantitySymbols = map
                            .reduce(function (total, current) { return number_precision_1.default.plus(total, current); }, 0);
                        winston_1.default.info(prefix + ("total quantity to liquidate: " + totalQuantitySymbols));
                        if (!(totalQuantitySymbols < valueToLiquidate)) return [3 /*break*/, 3];
                        winston_1.default.warn(prefix + "Amount orders is less then value to liquidate");
                        return [4 /*yield*/, Order_1.OrderSchema.updateMany({ instance: instance, strategy: strategy.name, version: strategy.version, side: side, $or: [{ status: Order_1.OrderStatus.EXECUTED }, { status: Order_1.OrderStatus.PARTIALLY_LIQUIDATE }] }, { $set: { status: Order_1.OrderStatus.LIQUIDATE } })];
                    case 2:
                        _a.sent();
                        this.sendMessage(instance);
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, {
                                amountLiquidated: totalQuantitySymbols,
                                leftLiquidate: number_precision_1.default.minus(valueToLiquidate, totalQuantitySymbols),
                                message: "Amount orders is less then value to liquidate, all orders was liquidated"
                            })];
                    case 3:
                        partiallyLiquidate = orders.filter(function (order) { return order.status === Order_1.OrderStatus.PARTIALLY_LIQUIDATE; });
                        if (partiallyLiquidate.length > 0)
                            winston_1.default.info(prefix + ("quantity orders partially liquidates: " + partiallyLiquidate.length));
                        orderIdsToLiquidate = [];
                        sum = 0;
                        index = 0;
                        while (valueToLiquidate > sum) {
                            if (orders[index].status === Order_1.OrderStatus.PARTIALLY_LIQUIDATE)
                                sum = number_precision_1.default.plus(sum, orders[index].liquidateValue);
                            else
                                sum = number_precision_1.default.plus(sum, orders[index].quantitySymbol);
                            orderIdsToLiquidate.push(orders[index]._id);
                            index++;
                        }
                        restValue = number_precision_1.default.minus(sum, valueToLiquidate);
                        orderIdToLiquidatePartially = orders[index - 1]._id;
                        filter = orderIdsToLiquidate.map(function (id) { return ({ _id: id }); });
                        return [4 /*yield*/, Order_1.OrderSchema.updateMany({ $or: filter }, { $set: { status: Order_1.OrderStatus.LIQUIDATE }, $unset: { liquidateValue: "" } })];
                    case 4:
                        _a.sent();
                        if (!(restValue === 0)) return [3 /*break*/, 5];
                        winston_1.default.info(prefix + " value totally liquidated ");
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Order_1.OrderSchema.update({ _id: orderIdToLiquidatePartially }, { $set: { status: Order_1.OrderStatus.LIQUIDATE }, $unset: { liquidateValue: "" } })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        this.sendMessage(instance);
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, {
                                amountLiquidated: valueToLiquidate > restValue ? number_precision_1.default.minus(valueToLiquidate, restValue) : valueToLiquidate,
                                leftLiquidate: restValue
                            })];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        if (e_1 instanceof ApplicationResponse_1.ApplicationResponse)
                            return [2 /*return*/, e_1];
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, e_1.message);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ServiceLiquidate.prototype.sendMessage = function (instance) {
        var msg = {
            action: 'EXPOSITION_RELOAD',
            type: projectName_1.Project.MARKET_MAKER,
            instance: instance,
            content: {},
            timestamp: Date.now()
        };
        kafka_producer_1.KafkaProducer.getInstance().create({
            topic: Topic_1.TopicProducers.BOT_MANAGER,
            messages: [{ value: JSON.stringify(msg) }]
        });
    };
    return ServiceLiquidate;
}());
exports.ServiceLiquidate = ServiceLiquidate;
//# sourceMappingURL=service.liquidate.js.map