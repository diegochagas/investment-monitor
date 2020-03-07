import {SymbolValue} from "./SymbolValue";

export class TradingContextOptions {
    mainCurrency?: string = undefined;
    allowedSymbols?: string[] = undefined;
    blockedSymbols?: string[] = undefined;
    targetAllocation?: SymbolValue = new SymbolValue({});
    operationalLimitsPerSymbol?: SymbolValue = new SymbolValue({});
}