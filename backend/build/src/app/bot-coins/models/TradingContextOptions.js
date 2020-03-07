"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SymbolValue_1 = require("./SymbolValue");
var TradingContextOptions = /** @class */ (function () {
    function TradingContextOptions() {
        this.mainCurrency = undefined;
        this.allowedSymbols = undefined;
        this.blockedSymbols = undefined;
        this.targetAllocation = new SymbolValue_1.SymbolValue({});
        this.operationalLimitsPerSymbol = new SymbolValue_1.SymbolValue({});
    }
    return TradingContextOptions;
}());
exports.TradingContextOptions = TradingContextOptions;
//# sourceMappingURL=TradingContextOptions.js.map