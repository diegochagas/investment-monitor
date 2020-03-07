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
var ConfigCryptoMarketPrice = /** @class */ (function () {
    function ConfigCryptoMarketPrice() {
        /**
         * Topicos para exchanges internas
         */
        this.exchangesInside = [''];
        /**
         * Topicos para exchanges externas
         */
        this.exchangesOutside = [''];
        /**
         * Habilita ou não o forex no cálculo
         */
        this.forexEnable = undefined;
    }
    __decorate([
        class_validator_1.IsArray(),
        __metadata("design:type", Array)
    ], ConfigCryptoMarketPrice.prototype, "exchangesInside", void 0);
    __decorate([
        class_validator_1.IsArray(),
        __metadata("design:type", Array)
    ], ConfigCryptoMarketPrice.prototype, "exchangesOutside", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        __metadata("design:type", Boolean)
    ], ConfigCryptoMarketPrice.prototype, "forexEnable", void 0);
    return ConfigCryptoMarketPrice;
}());
exports.ConfigCryptoMarketPrice = ConfigCryptoMarketPrice;
//# sourceMappingURL=ConfigCryptoMarketPrice.js.map