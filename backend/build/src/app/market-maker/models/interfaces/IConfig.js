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
var ConfigStrategyOrder_1 = require("./ConfigStrategyOrder");
var class_validator_1 = require("class-validator");
var typegoose_1 = require("typegoose");
var ConfigStrategy_1 = require("./ConfigStrategy");
var ConfigExchangeOptions_1 = require("./ConfigExchangeOptions");
var ConfigGlobal_1 = require("./ConfigGlobal");
var ConfigKafka_1 = require("./ConfigKafka");
var ConfigCryptoMarketPrice_1 = require("./ConfigCryptoMarketPrice");
var ConfigReferencePrice_1 = require("./ConfigReferencePrice");
var ConfigForexMarketPrice_1 = require("./ConfigForexMarketPrice");
var ConfigExposition_1 = require("./ConfigExposition");
var IConfig = /** @class */ (function () {
    function IConfig() {
        /**
         * ExchageId
         */
        this.exchange = undefined;
        /**
         * mockado da collection exchange
         */
        this.exchangeOptions = new ConfigExchangeOptions_1.ConfigExchangeOptions();
        /**
         * Criado dinamicamente pois é necessário verificar a última versão
         */
        this.strategy = new ConfigStrategy_1.ConfigStrategy();
        //credentials: any // criado dinamicamente
        /**
         * criado dinamicamente
         */
        this.walletId = undefined;
        this.currencyPair = undefined;
        /**
         * Gerado pelos valores provenientes de cryptoMarketPrice e forexMarketPrice
         */
        this.kafka = new ConfigKafka_1.ConfigKafka();
        /**
         * Configurações para determinar preço
         */
        this.cryptoMarketPrice = new ConfigCryptoMarketPrice_1.ConfigCryptoMarketPrice();
        /**
         * Prex
         */
        this.referencePrice = new ConfigReferencePrice_1.ConfigReferencePrice();
        /**
         * Mercado Forex
         */
        this.forexMarketPrice = new ConfigForexMarketPrice_1.ConfigForexMarketPrice();
        /**
         * Valores globais
         */
        this.global = new ConfigGlobal_1.ConfigGlobal();
        /**
         * Order Config
         */
        this.order = new ConfigStrategyOrder_1.ConfigStrategyOrder();
        /**
         *
         */
        this.exposition = new ConfigExposition_1.ConfigExposition();
        /**
         * when stop
         */
        this.stopLoss = undefined;
        // rebalancer? = new IRebalancer({});
        // engine? = new IEngine();
        // marketBasePrice? = new IMarketBasePrice();
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], IConfig.prototype, "currencyPair", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", ConfigKafka_1.ConfigKafka)
    ], IConfig.prototype, "kafka", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", ConfigCryptoMarketPrice_1.ConfigCryptoMarketPrice)
    ], IConfig.prototype, "cryptoMarketPrice", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", ConfigReferencePrice_1.ConfigReferencePrice)
    ], IConfig.prototype, "referencePrice", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", ConfigForexMarketPrice_1.ConfigForexMarketPrice)
    ], IConfig.prototype, "forexMarketPrice", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsDefined(),
        __metadata("design:type", Object)
    ], IConfig.prototype, "global", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], IConfig.prototype, "order", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsDefined(),
        __metadata("design:type", ConfigExposition_1.ConfigExposition)
    ], IConfig.prototype, "exposition", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], IConfig.prototype, "stopLoss", void 0);
    return IConfig;
}());
exports.IConfig = IConfig;
//# sourceMappingURL=IConfig.js.map