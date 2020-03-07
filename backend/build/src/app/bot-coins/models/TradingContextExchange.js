"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TradingContextExchangeOptions_1 = require("./TradingContextExchangeOptions");
var TradingContextExchange = /** @class */ (function () {
    function TradingContextExchange() {
        this.snapshotType = undefined;
        this.snapshotTimeStamp = undefined;
        this.snapshotVersion = undefined;
        this.id = undefined;
        this.options = new TradingContextExchangeOptions_1.TradingContextExchangeOptions();
        this.markets = undefined;
        this.wallets = undefined;
    }
    return TradingContextExchange;
}());
exports.TradingContextExchange = TradingContextExchange;
//# sourceMappingURL=TradingContextExchange.js.map