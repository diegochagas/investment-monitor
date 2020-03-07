import {TradingContextExchange} from "./TradingContextExchange";
import {TradingContextOptions} from "./TradingContextOptions";

export class TradingContext {
    snapshotType?: string = undefined;
    snapshotTimeStamp?: number = undefined;
    snapshotVersion?: number = undefined;
    id?: string = undefined;
    creationTimeStamp?: number = undefined;
    options?: TradingContextOptions = new TradingContextOptions();
    exchanges?: TradingContextExchange[] = undefined;
}