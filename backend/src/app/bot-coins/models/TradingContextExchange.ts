import {TradingContextExchangeOptions} from "./TradingContextExchangeOptions";
import {TradingContextExchangeMarket} from "./TradingContextExchangeMarket";
import {TradingContextExchangeWallet} from "./TradingContextExchangeWallet";


export class TradingContextExchange {
    snapshotType?: string = undefined;
    snapshotTimeStamp?: number = undefined;
    snapshotVersion?: number = undefined;
    id?: string = undefined;
    options?: TradingContextExchangeOptions = new TradingContextExchangeOptions();
    markets?: TradingContextExchangeMarket[] = undefined;
    wallets?: TradingContextExchangeWallet[] = undefined;
}