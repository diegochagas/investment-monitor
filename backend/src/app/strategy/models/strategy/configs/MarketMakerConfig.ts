/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import {ConfigExchangeOptions} from "./types/ConfigExchangeOptions";
import {IsDefined, IsString, IsOptional, ValidateNested, IsNumber, IsArray} from "class-validator";
import {ConfigKafka} from "./types/ConfigKafka";
import {ConfigCryptoMarketPrice} from "./types/ConfigCryptoMarketPrice";
import {ConfigReferencePrice} from "./types/ConfigReferencePrice";
import {ConfigForexMarketPrice} from "./types/ConfigForexMarketPrice";
import {ConfigGlobal} from "./types/ConfigGlobal";
import {ConfigExposition} from "../../../../market-maker/models/interfaces/ConfigExposition";
import {ConfigStrategy} from "./ConfigStrategy";
import {IConfig} from "../interfaces/IConfig";
import {ConfigStrategyOrder} from "./types/ConfigStrategyOrder";

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
export class MarketMakerConfig implements IConfig {
    /**
     * ExchageId
     */
    exchange?: string = undefined;

    exchangeName?: string = undefined;

    /**
     * mockado da collection exchange
     */
    exchangeOptions? = new ConfigExchangeOptions();

    /**
     * Criado dinamicamente pois é necessário verificar a última versão
     */
    strategy = new ConfigStrategy();

    //credentials: any // criado dinamicamente

    /**
     * criado dinamicamente
     */
    walletId?: string = undefined;

    @IsString()
    @IsDefined()
    currencyPair?: string = undefined;

    /**
     * Gerado pelos valores provenientes de cryptoMarketPrice e forexMarketPrice
     */
    @IsOptional()
    @ValidateNested()
    kafka?: ConfigKafka = new ConfigKafka();

    /**
     * Configurações para determinar preço
     */
    @IsOptional()
    @ValidateNested()
    cryptoMarketPrice?: ConfigCryptoMarketPrice = new ConfigCryptoMarketPrice();

    /**
     * Prex
     */
    @IsOptional()
    @ValidateNested()
    referencePrice?: ConfigReferencePrice = new ConfigReferencePrice();

    /**
     * Mercado Forex
     */
    @IsOptional()
    @ValidateNested()
    forexMarketPrice?: ConfigForexMarketPrice = new ConfigForexMarketPrice();

    /**
     * Valores globais
     */
    @ValidateNested()
    @IsDefined()
    global = new ConfigGlobal();

    /**
     * Order GarchConfig
     */
    @ValidateNested()
    @IsDefined()
    order = new ConfigStrategyOrder();

    /**
     *
     */
    @ValidateNested()
    @IsDefined()
    exposition: ConfigExposition = new ConfigExposition();

    /**
     * when stop
     */
    @IsDefined()
    @IsNumber()
    stopLoss?: number = undefined;

    /**
     *
     */
    @IsArray()
    @IsDefined()
    engine?: string[] = [];


    // rebalancer? = new IRebalancer({});
    // marketBasePrice? = new IMarketBasePrice();
}
