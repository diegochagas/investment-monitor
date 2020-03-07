"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SymbolValue_1 = require("./SymbolValue");
var TradingContextExchangeWallet = /** @class */ (function () {
    function TradingContextExchangeWallet() {
        this.snapshotType = undefined;
        this.snapshotTimeStamp = undefined;
        this.snapshotVersion = undefined;
        this.guid = undefined;
        this.id = undefined;
        this.estimatedTradeableBalance = new SymbolValue_1.SymbolValue({});
        this.estimatedOpenTradeOrders = [];
        this.flags = [];
        this.lastKnownBalance = new SymbolValue_1.SymbolValue({});
        this.lastKnownTradeableBalance = new SymbolValue_1.SymbolValue({});
        this.lastSynchronizationTimeStamp = undefined;
        this.lastTradeTimeStamp = undefined;
        this.lastTradeFailureTimeStamp = undefined;
        this.lastEstimatedTradeableBalanceSynchronizationTimeStamp = undefined;
        this.lastKnownOpenTradeOrders = [];
        this.tradeRequestsBeingPlaced = [];
        this.offline = undefined;
        this.canTrade = undefined;
        this.haltCodes = [];
    }
    return TradingContextExchangeWallet;
}());
exports.TradingContextExchangeWallet = TradingContextExchangeWallet;
//# sourceMappingURL=TradingContextExchangeWallet.js.map