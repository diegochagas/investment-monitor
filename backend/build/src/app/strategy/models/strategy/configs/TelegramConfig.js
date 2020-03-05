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
require("reflect-metadata");
var class_validator_1 = require("class-validator");
var ConfigStrategy_1 = require("./ConfigStrategy");
/**
 * @typedef Config
 * @property { ConfigContent } content.required - Content required to robot
 * @property { integer } orderSize.required - Size of order - eg: 20000
 * @property { string } exchange.required
 */
var TelegramConfig = /** @class */ (function () {
    function TelegramConfig() {
        this.strategy = new ConfigStrategy_1.ConfigStrategy();
        this.pairs = undefined;
        this.orderSize = undefined;
        this.exchange = undefined;
        /**
         * criado dinamicamente
         */
        this.walletId = undefined;
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], TelegramConfig.prototype, "orderSize", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        __metadata("design:type", Number)
    ], TelegramConfig.prototype, "exchange", void 0);
    return TelegramConfig;
}());
exports.TelegramConfig = TelegramConfig;
//# sourceMappingURL=TelegramConfig.js.map