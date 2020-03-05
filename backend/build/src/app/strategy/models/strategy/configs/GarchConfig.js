"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
require("reflect-metadata");
var ConfigStrategy_1 = require("./ConfigStrategy");
var OrderType;
(function (OrderType) {
    OrderType["LIMIT"] = "LIMIT";
    OrderType["MARKET"] = "MARKET";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var TradeWindow;
(function (TradeWindow) {
    TradeWindow["4MIN"] = "4MIN";
    TradeWindow["5MIN"] = "5MIN";
    TradeWindow["6MIN"] = "6MIN";
    TradeWindow["10MIN"] = "10MIN";
    TradeWindow["15MIN"] = "15MIN";
    TradeWindow["30MIN"] = "30MIN";
    TradeWindow["1HRS"] = "1HRS";
    TradeWindow["2HRS"] = "2HRS";
    TradeWindow["4HRS"] = "4HRS";
})(TradeWindow = exports.TradeWindow || (exports.TradeWindow = {}));
/**
 * @typedef GarchConfig
 * @property { integer } usd.required - Qtd trade - eg: 15
 * @property { enum } tradeWindow.required - Trade window time -eg: 4MIN, 5MIN, 6MIN, 10MIN, 15MIN, 30MIN, 1HRS, 2HRS, 4HRS
 * @property { enum } orderType.required - Order Type - eg: LIMIT, MARKET
 * @property { integer } expose - Expose - eg: 50
 * @property { integer } fee.required - Fee - eg: 0.002
 * @property { integer } stop.required - Stop - eg: 0.02
 * @property { ConfigStrategy.model } strategy - Generate dynamic
 * @property { integer } maxSamples - Max Sample -eg : 0
 * @property { integer } candleTime.required - eg: 5
 * @property { string } exchange.required - Exchange Id
 * @property {integer} takeProfit
 * @property { ConfigExchangeOptions.model } exchangeOptions
 */
var GarchConfig = /** @class */ (function () {
    function GarchConfig() {
        this.maxSamples = undefined;
        this.usd = undefined;
        this.tradeWindow = undefined;
        this.orderType = undefined;
        this.candleTime = undefined;
        this.expose = undefined;
        this.fee = undefined;
        this.stop = undefined;
        this.exchange = undefined;
        this.exchangeName = undefined;
        this.exchangeOptions = undefined;
        this.takeProfit = undefined;
        this.idleMinutesAfterStop = undefined;
        this.stopLimit = undefined;
        this.stopLimitTrigger = undefined;
        /**
         * Criado dinamicamente pois é necessário verificar a última versão
         */
        this.strategy = new ConfigStrategy_1.ConfigStrategy();
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "maxSamples", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "usd", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEnum(TradeWindow),
        __metadata("design:type", String)
    ], GarchConfig.prototype, "tradeWindow", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEnum(OrderType),
        __metadata("design:type", String)
    ], GarchConfig.prototype, "orderType", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "candleTime", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "expose", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "fee", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "stop", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], GarchConfig.prototype, "exchange", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "takeProfit", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "idleMinutesAfterStop", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "stopLimit", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], GarchConfig.prototype, "stopLimitTrigger", void 0);
    return GarchConfig;
}());
exports.GarchConfig = GarchConfig;
//# sourceMappingURL=GarchConfig.js.map