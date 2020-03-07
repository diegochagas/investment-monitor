
export class TradingContextExchangeMarket {
    snapshotType?: string = undefined;
    snapshotTimeStamp?: number = undefined;
    snapshotVersion?: number = undefined;
    guid?: string = undefined;
    id?: string = undefined;
    exchange?: string = undefined;
    symbol?: string = undefined;
    currency?: string = undefined;
    flags?: string[] = undefined;
    orderBook?: any = undefined;
    canTrade?: boolean = undefined;
    canBuy?: boolean = undefined;
    canSell?: boolean = undefined;
    haltCodesByOperation?: any = undefined;
}