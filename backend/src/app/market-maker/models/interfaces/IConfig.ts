/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import { ConfigStrategyOrder } from './ConfigStrategyOrder';
import {IsArray, IsBoolean, IsDefined, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {prop} from "typegoose";
import {ConfigStrategy} from "./ConfigStrategy";
import {ConfigExchangeOptions} from "./ConfigExchangeOptions";
import {ConfigGlobal} from "./ConfigGlobal";
import {ConfigKafka} from "./ConfigKafka";
import {ConfigCryptoMarketPrice} from "./ConfigCryptoMarketPrice";
import {ConfigReferencePrice} from "./ConfigReferencePrice";
import {ConfigForexMarketPrice} from "./ConfigForexMarketPrice";
import {ConfigExposition} from "./ConfigExposition";

export class IConfig {
    /**
     * ExchageId
     */
    exchange?: string = undefined;

    /**
     * mockado da collection exchange
     */
    exchangeOptions? = new ConfigExchangeOptions();

    /**
     * Criado dinamicamente pois é necessário verificar a última versão
     */
    strategy? = new ConfigStrategy();

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
     * Order Config
     */
    @ValidateNested()
    @IsDefined()
    @prop()
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

    // rebalancer? = new IRebalancer({});
    // engine? = new IEngine();
    // marketBasePrice? = new IMarketBasePrice();
}