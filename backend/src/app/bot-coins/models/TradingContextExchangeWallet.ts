import {SymbolValue} from "./SymbolValue";

export class TradingContextExchangeWallet {
    snapshotType?: string = undefined;
    snapshotTimeStamp?: number = undefined;
    snapshotVersion?: number = undefined;
    guid?: string = undefined;
    id?: string = undefined;
    estimatedTradeableBalance?: SymbolValue = new SymbolValue({});
    estimatedOpenTradeOrders?: string[] = [];
    flags?: string[] = [];
    lastKnownBalance: SymbolValue = new SymbolValue({});
    lastKnownTradeableBalance?: SymbolValue = new SymbolValue({});
    lastSynchronizationTimeStamp?: number = undefined;
    lastTradeTimeStamp?: number = undefined;
    lastTradeFailureTimeStamp?: number = undefined;
    lastEstimatedTradeableBalanceSynchronizationTimeStamp?: number = undefined;
    lastKnownOpenTradeOrders?: string[] = [];
    tradeRequestsBeingPlaced?: string[] = [];
    offline?: boolean = undefined;
    canTrade?: boolean = undefined;
    haltCodes?: string[] = [];
}