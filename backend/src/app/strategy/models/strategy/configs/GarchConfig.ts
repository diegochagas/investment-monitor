import { IsDefined, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import 'reflect-metadata';
import { ConfigStrategy } from "./ConfigStrategy";
import { IConfig } from "../interfaces/IConfig";
import { ConfigExchangeOptions } from "./types/ConfigExchangeOptions";
import { isNumber } from "util";

export enum OrderType {
    LIMIT = 'LIMIT',
    MARKET = 'MARKET'
}

export enum TradeWindow {
    "4MIN" = "4MIN",
    "5MIN" = "5MIN",
    "6MIN" = "6MIN",
    "10MIN" = "10MIN",
    "15MIN" = "15MIN",
    "30MIN" = "30MIN",
    "1HRS" = "1HRS",
    "2HRS" = "2HRS",
    "4HRS" = "4HRS"
}

/**
 * @typedef GarchConfig
 * @property { integer } usd.required - Qtd trade - eg: 15
 * @property { enum } tradeWindow.required - Trade window time -eg: 4MIN, 5MIN, 6MIN, 10MIN, 15MIN, 30MIN, 1HRS, 2HRS, 4HRS
 * @property { enum } orderType.required - Order Type - eg: LIMIT, MARKET
 * @property { integer } expose - Expose - eg: 50
 * @property { integer } fee.required - Fee - eg: 0.002
 * @property { integer } stop.required - Stop - eg: 0.02
 * @property { ConfigStrategy.model } strategy - Generate dynamic
 * @property { integer } maxSamples - Max Sample -eg : 0
 * @property { integer } candleTime.required - eg: 5
 * @property { string } exchange.required - Exchange Id
 * @property {integer} takeProfit 
 * @property { ConfigExchangeOptions.model } exchangeOptions
 */
export class GarchConfig implements IConfig {

    @IsOptional()
    @IsNumber()
    maxSamples?: number = undefined;

    @IsDefined()
    @IsNumber()
    usd?: number = undefined;

    @IsDefined()
    @IsEnum(TradeWindow)
    tradeWindow?: TradeWindow = undefined;

    @IsDefined()
    @IsEnum(OrderType)
    orderType?: OrderType = undefined;

    @IsDefined()
    @IsNumber()
    candleTime?: number = undefined;

    @IsDefined()
    @IsNumber()
    expose?: number = undefined;

    @IsDefined()
    @IsNumber()
    fee?: number = undefined;

    @IsDefined()
    @IsNumber()
    stop?: number = undefined;

    @IsDefined()
    @IsString()
    exchange?: string = undefined;

    exchangeName?: string = undefined;

    exchangeOptions?: ConfigExchangeOptions = undefined;

    @IsDefined()
    @IsNumber()
    takeProfit?: number = undefined

    @IsDefined()
    @IsNumber()
    idleMinutesAfterStop?: number = undefined
    @IsDefined()
    @IsNumber()
    stopLimit?: number = undefined

    @IsDefined()
    @IsNumber()
    stopLimitTrigger?: number = undefined

    /**
     * Criado dinamicamente pois é necessário verificar a última versão
     */
    strategy: ConfigStrategy = new ConfigStrategy();

    walletId?: string;
}
