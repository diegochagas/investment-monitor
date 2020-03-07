import {prop, Ref, Typegoose} from "typegoose";
import {connectToArbitrorDB} from "../db/db";
import {TradingContext} from "./TradingContext";
import {GlobalRates} from "./GlobalRates";

export class ContextSnapshots extends Typegoose{

    @prop()
    tradingContexts: TradingContext[] = [];

    @prop()
    globalRates?: GlobalRates;

    @prop()
    timeStamp?: number = undefined;

    @prop()
    version?: number = undefined;
}

export const ContextSnapshotsSchema = new ContextSnapshots().getModelForClass(ContextSnapshots, {
    existingConnection: connectToArbitrorDB(),
    schemaOptions: {
        collection: 'contextSnapshots'
    }
});

/**
 * @typedef IBalanceResponse
 * @property { IBalanceFormatted.model } initial
 * @property { IBalanceFormatted.model } final
 */
export interface IBalanceResponse {
    initial: IBalanceFormatted,
    final: IBalanceFormatted
}

/**
 * @typedef IBalanceFormatted
 * @property { string } mainCurrency
 * @property { number } totalValue
 * @property { number } timeStamp
 * @property { IValueByExchange[] } valuesByExchange
 */
export interface IBalanceFormatted {
    mainCurrency: string;
    totalValue: number;
    timeStamp: number;
    valuesByExchange: IValueByExchange[];
}

/**
 * @typedef IValueByExchange
 * @property { string } name
 * @property { number } totalValue
 * @property { any } lastKnownBalances
 */
export interface IValueByExchange {
    name?: string;
    totalValue?: number;
    lastKnownBalances?: {
        [index: string]: number
    }
}