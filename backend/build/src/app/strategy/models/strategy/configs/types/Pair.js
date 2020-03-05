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
 * @typedef Pair
 * @property { integer } sequencie
 * @property { string } currency
 * @property { string } pair.required
 * @property { string } volume24h
 * @property { integer } volumePercent.required
 * @property { string } type
 * @property { integer } weight.required
 * @property { string } channelId.required
 */
var Pair = /** @class */ (function () {
    function Pair() {
        this.sequence = undefined;
        this.currency = undefined;
        this.pair = undefined;
        this.volume24h = undefined;
        this.volumePercent = undefined;
        this.type = undefined;
        this.weight = undefined;
        this.channelId = undefined;
    }
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Number)
    ], Pair.prototype, "sequence", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], Pair.prototype, "currency", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], Pair.prototype, "pair", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], Pair.prototype, "volume24h", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined(),
        __metadata("design:type", Number)
    ], Pair.prototype, "volumePercent", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], Pair.prototype, "type", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], Pair.prototype, "weight", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], Pair.prototype, "channelId", void 0);
    return Pair;
}());
exports.Pair = Pair;
//# sourceMappingURL=Pair.js.map