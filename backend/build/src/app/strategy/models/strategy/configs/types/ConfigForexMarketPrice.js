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
/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
var class_validator_1 = require("class-validator");
/**
 * Mercado Forex (USD, BRL, EUR...)
 * @typedef ConfigForexMarketPrice
 * @property { string } subscribe
 * @property { string } currencyBase
 * @property { string } currencyQuote
 */
var ConfigForexMarketPrice = /** @class */ (function () {
    function ConfigForexMarketPrice() {
        /**
         * Topico para subscribe
         */
        this.subscribe = undefined;
        /**
         * Base
         */
        this.currencyBase = undefined;
        /**
         * Quote
         */
        this.currencyQuote = undefined;
    }
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], ConfigForexMarketPrice.prototype, "subscribe", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], ConfigForexMarketPrice.prototype, "currencyBase", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], ConfigForexMarketPrice.prototype, "currencyQuote", void 0);
    return ConfigForexMarketPrice;
}());
exports.ConfigForexMarketPrice = ConfigForexMarketPrice;
//# sourceMappingURL=ConfigForexMarketPrice.js.map