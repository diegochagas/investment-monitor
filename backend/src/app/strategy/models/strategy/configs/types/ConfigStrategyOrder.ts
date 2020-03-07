import {IsEnum, IsOptional, IsNumber, IsDefined, ValidateNested} from "class-validator";
import {prop} from "typegoose";
import {FractionOrder} from "./FractionOrder";
import {PercentUpdate} from "./PercentUpdate";

export enum MidPriceType {
    DEFAULT = "DEFAULT",
    LAST_PRICE = "LAST_PRICE",
    PRECISION = "PRECISION",
    MARKET = "MARKET"
}
export enum InitialMidPriceType {
    INSIDE = "INSIDE",
    OUTSIDE = "OUTSIDE"
}

/**
 * @typedef ConfigStrategyOrder
 * @property { string } exectype - Exec Type - eg: SPREAD
 * @property { enum } initialMidPriceType - Mif Price Type - eg: INSIDE, OUTSIDE
 * @property { integer } amountOrders
 * @property { integer } defaultSpread
 * @property { integer } orderSide
 * @property { integer } stepSize
 * @property { integer } ordersInterval
 * @property { integer } maxOrders
 * @property { integer } orderSizeAsk
 * @property { integer } orderSizeBid
 * @property { integer } spreadAsk
 * @property { integer } spreadBid
 * @property { integer } stepSizeAsk
 * @property { integer } stepSizeBid
 * @property { enum } midPriceType - MidPriceType - eg: DEFAULT, LAST_PRICE, PRECISION, MARKET
 * @property { FractionOrder.model } fractionOrder
 * @property { PercentUpdate.model } percentUpdate
 */
export class ConfigStrategyOrder {
    @prop()
    execType: string = 'SPREAD'; //mockado sempre SPREAD

    /**
     * Preço inicial
     */
    @IsDefined()
    initialMidPriceType?: InitialMidPriceType = undefined;

    /**
     * Quantidade de ordens
     */
    @IsNumber()
    @IsDefined()
    amountOrders?: number = undefined;

    /**
     * new MaxSpread
     */
    @IsNumber()
    @IsDefined()
    defaultSpread?: number = undefined;

    @IsNumber()
    @IsDefined()
    orderSize?: number = undefined;

    @IsNumber()
    @IsDefined()
    stepSize?: number = undefined;

    @IsNumber()
    @IsDefined()
    ordersInterval?: number = undefined;

    @IsNumber()
    @IsDefined()
    maxOrders?: number = undefined;

    @IsNumber()
    @IsDefined()
    orderSizeAsk?: number = undefined;

    @IsNumber()
    @IsDefined()
    orderSizeBid?: number = undefined;

    @IsNumber()
    @IsDefined()
    spreadAsk?: number = undefined;

    @IsNumber()
    @IsDefined()
    spreadBid?: number = undefined;

    @IsNumber()
    @IsDefined()
    stepSizeAsk?: number = undefined;

    @IsNumber()
    @IsDefined()
    stepSizeBid?: number = undefined;

    @IsNumber()
    @IsDefined()
    amountOrdersAsk?: number = undefined;

    @IsNumber()
    @IsDefined()
    amountOrdersBid?: number = undefined;

    @IsNumber()
    @IsDefined()
    maxOrdersAsk?: number = undefined;

    @IsNumber()
    @IsDefined()
    maxOrdersBid?: number = undefined;

    @IsNumber()
    @IsDefined()
    ordersIntervalAsk?: number = undefined;

    @IsNumber()
    @IsDefined()
    ordersIntervalBid?: number = undefined;


    @IsEnum(MidPriceType)
    @IsOptional()
    midPriceType?: MidPriceType = undefined;

    @IsDefined()
    @ValidateNested()
    fractionOrder? = new  FractionOrder();

    @IsDefined()
    @ValidateNested()
    percentUpdate? = new  PercentUpdate();
}
