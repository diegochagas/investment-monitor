import { IFeeExchange } from './IFeeExchange';
import { IFractionOrder } from './IFractionOrder';
import { IPercentUpdate } from './IPercentUpdate';
import {IsEnum, IsOptional, IsNumber, IsDefined, ValidateNested} from "class-validator";
import {prop} from "typegoose";

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

    @IsEnum(MidPriceType)
    @IsOptional()
    midPriceType?: MidPriceType = undefined;

    @IsDefined()
    @ValidateNested()
    fractionOrder? = new  IFractionOrder();

    @IsDefined()
    @ValidateNested()
    percentUpdate? = new  IPercentUpdate();
}
