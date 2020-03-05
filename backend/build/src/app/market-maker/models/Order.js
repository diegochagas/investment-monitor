"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var typegoose_1 = require("typegoose");
require("reflect-metadata");
var class_validator_1 = require("class-validator");
var db_1 = require("../db/db");
/**
 * @typedef Order
 * @property { string } strategy.required - Strategy name - eg: strategy0name
 * @property { string } exchange.required - Exchange name - eg: Binance
 * @property { string } market.required - Market - eg: BTC_USDT
 * @property { string } symbol.required - Symbol - eg: Symbol
 * @property { string } currency.required - Currency eg: USDT
 * @property { string } orderId - Order ID - eg: 36546984
 * @property { string } guID.required - guID - eg: 368232775.atlas01@binance
 * @property { integer } price.required - Price - eg: 7811.78
 * @property { integer } quantity.required - Quantity - eg: 20.654635
 * @property { integer } quantitySymbol.required - Quantity - eg: 20.654635
 * @property { integer } fee.required - Fee - eg: 0.0000000062
 * @property { enum } side.required - Side - eg: BUY, SELL
 * @property { string } status.required - Status - eg: CANCELED
 * @property { string } instanceID.required - Instance - eg: 32fsd-1sfv2-g2sfdgsd5-gd3f51d
 */
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.strategy = undefined;
        _this.exchange = undefined;
        _this.market = undefined;
        _this.symbol = undefined;
        _this.currency = undefined;
        _this.orderID = undefined;
        _this.guID = undefined;
        _this.price = undefined;
        _this.quantity = undefined;
        _this.quantitySymbol = undefined;
        _this.fee = undefined;
        _this.side = undefined;
        _this.status = undefined;
        _this.timestamp = undefined;
        _this.timestampUpdate = undefined;
        _this.liquidateValue = undefined;
        return _this;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "strategy", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "exchange", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "market", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "symbol", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "currency", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "orderID", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "guID", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Order.prototype, "price", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Order.prototype, "quantity", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Order.prototype, "quantitySymbol", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Order.prototype, "fee", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "side", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "status", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Order.prototype, "timestamp", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Order.prototype, "timestampUpdate", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Order.prototype, "liquidateValue", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Order.prototype, "instance", void 0);
    return Order;
}(typegoose_1.Typegoose));
exports.Order = Order;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CANCELED"] = "CANCELED";
    OrderStatus["OPEN"] = "OPEN";
    OrderStatus["EXECUTED"] = "EXECUTED";
    OrderStatus["PARTIALLY_EXECUTED"] = "PARTIALLY_EXECUTED";
    OrderStatus["LIQUIDATE"] = "LIQUIDATE";
    OrderStatus["PARTIALLY_LIQUIDATE"] = "PARTIALLY_LIQUIDATE";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
exports.OrderSchema = new Order().getModelForClass(Order, {
    existingConnection: db_1.connectToMarketMakerDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true }, collection: 'order'
    }
});
/**
 * @typedef Strategy
 * @property { string } name.required - Strategy name - eg: MM_TESTE_!
 * @property { integer } version.required - Strategy version - eg: 1
 */
/**
 * @typedef LiquidateRequest
 * @property { enum } side.required - side - eg: BUY,SELL
 * @property { string } instance.required - instanceid - eg: intanceId
 * @property { value } value.required - Value to liquidate - eg: 1.5
 * @property { Strategy.model } strategy.required
 */
/**
 * @typedef LiquidateResponse
 * @property { integer } amountLiquidated
 * @property { integer } leftLiquidate
 * @property { string } message - Mensagem - eg: Amount orders is less then value to liquidate, all orders was liquidated
 */
//# sourceMappingURL=Order.js.map