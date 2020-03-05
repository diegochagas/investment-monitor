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
var ConfigExchangeOptions_1 = require("./types/ConfigExchangeOptions");
var class_validator_1 = require("class-validator");
var ConfigKafka_1 = require("./types/ConfigKafka");
var ConfigCryptoMarketPrice_1 = require("./types/ConfigCryptoMarketPrice");
var ConfigReferencePrice_1 = require("./types/ConfigReferencePrice");
var ConfigForexMarketPrice_1 = require("./types/ConfigForexMarketPrice");
var ConfigGlobal_1 = require("./types/ConfigGlobal");
var ConfigExposition_1 = require("../../../../market-maker/models/interfaces/ConfigExposition");
var ConfigStrategy_1 = require("./ConfigStrategy");
var ConfigStrategyOrder_1 = require("./types/ConfigStrategyOrder");
/**
 * @typedef MarketMakerConfig
 * @property { string } exchange.required - Exchange ID
 * @property { ConfigExchangeOptions.model } exchangeOptions
 * @property { ConfigStrategy.model } strategy
 * @property { string } waletId
 * @property { string } currencyPair
 * @property { ConfigKafka.model } kafka
 * @property { ConfigCryptoMarketPrice.model }  cryptoMarketPrice
 * @property { ConfigReferencePrice.model } referencePrice
 * @property { ConfigForexMarketPrice.model } forexMarketPrice
 * @property { ConfigGlobal.model } global
 * @property { ConfigStrategyOrder.model } order
 * @property { ConfigExposition.model } exposition
 *
 */
var MarketMakerConfig = /** @class */ (function () {
    function MarketMakerConfig() {
        /**
         * ExchageId
         */
        this.exchange = undefined;
        this.exchangeName = undefined;
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
         * Order GarchConfig
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
        /**
         *
         */
        this.engine = [];
        // rebalancer? = new IRebalancer({});
        // marketBasePrice? = new IMarketBasePrice();
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], MarketMakerConfig.prototype, "currencyPair", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", ConfigKafka_1.ConfigKafka)
    ], MarketMakerConfig.prototype, "kafka", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", ConfigCryptoMarketPrice_1.ConfigCryptoMarketPrice)
    ], MarketMakerConfig.prototype, "cryptoMarketPrice", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", ConfigReferencePrice_1.ConfigReferencePrice)
    ], MarketMakerConfig.prototype, "referencePrice", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", ConfigForexMarketPrice_1.ConfigForexMarketPrice)
    ], MarketMakerConfig.prototype, "forexMarketPrice", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsDefined(),
        __metadata("design:type", Object)
    ], MarketMakerConfig.prototype, "global", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsDefined(),
        __metadata("design:type", Object)
    ], MarketMakerConfig.prototype, "order", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsDefined(),
        __metadata("design:type", ConfigExposition_1.ConfigExposition)
    ], MarketMakerConfig.prototype, "exposition", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        __metadata("design:type", Number)
    ], MarketMakerConfig.prototype, "stopLoss", void 0);
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsDefined(),
        __metadata("design:type", Array)
    ], MarketMakerConfig.prototype, "engine", void 0);
    return MarketMakerConfig;
}());
exports.MarketMakerConfig = MarketMakerConfig;
//# sourceMappingURL=MarketMakerConfig.js.map