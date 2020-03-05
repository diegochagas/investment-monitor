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
 * Prex - Preço de Referência
 * @typedef ConfigReferencePrice
 * @property { integer } prexBand
 * @property { integer } externalPercent
 * @property { integer } internalPercent
 * @property { boolean } forexEnable
 */
var ConfigReferencePrice = /** @class */ (function () {
    function ConfigReferencePrice() {
        /**
         * Banda de referência
         */
        this.prexBand = undefined;
        /**
         * Percentual Externo
         */
        this.externalPercent = undefined;
        /**
         * Percentual Interno
         */
        this.internalPercent = undefined;
        /**
         * Habilitar o forex no calculo
         */
        this.forexEnable = undefined;
    }
    __decorate([
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], ConfigReferencePrice.prototype, "prexBand", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], ConfigReferencePrice.prototype, "externalPercent", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], ConfigReferencePrice.prototype, "internalPercent", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        __metadata("design:type", Boolean)
    ], ConfigReferencePrice.prototype, "forexEnable", void 0);
    return ConfigReferencePrice;
}());
exports.ConfigReferencePrice = ConfigReferencePrice;
//# sourceMappingURL=ConfigReferencePrice.js.map