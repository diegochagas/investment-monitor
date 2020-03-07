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
var ConfigExposition = /** @class */ (function () {
    function ConfigExposition() {
        /**
         * % Limite da exposição
         */
        this.expLimit = undefined;
        /**
         * % Limite para incremento de exposição
         */
        this.expLimitStep = undefined;
        /**
         * % Spread de exposição
         */
        this.expSpread = undefined;
        /**
         * % Multiplicador do tamanho de ordens por exposição (Size multiply)
         */
        this.sizeMultiply = undefined;
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], ConfigExposition.prototype, "expLimit", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], ConfigExposition.prototype, "expLimitStep", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], ConfigExposition.prototype, "expSpread", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], ConfigExposition.prototype, "sizeMultiply", void 0);
    return ConfigExposition;
}());
exports.ConfigExposition = ConfigExposition;
//# sourceMappingURL=ConfigExposition.js.map