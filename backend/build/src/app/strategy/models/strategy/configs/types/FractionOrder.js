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
/**
 * @typedef FractionOrder
 * @property { integer } fractionPercent
 * @property { integer } fractionQuantity
 */
var FractionOrder = /** @class */ (function () {
    function FractionOrder() {
        this.fractionPercent = undefined;
        this.fractionQuantity = undefined;
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], FractionOrder.prototype, "fractionPercent", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], FractionOrder.prototype, "fractionQuantity", void 0);
    return FractionOrder;
}());
exports.FractionOrder = FractionOrder;
//# sourceMappingURL=FractionOrder.js.map