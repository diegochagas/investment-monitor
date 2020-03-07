"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TradingContextOptions_1 = require("./TradingContextOptions");
var TradingContext = /** @class */ (function () {
    function TradingContext() {
        this.snapshotType = undefined;
        this.snapshotTimeStamp = undefined;
        this.snapshotVersion = undefined;
        this.id = undefined;
        this.creationTimeStamp = undefined;
        this.options = new TradingContextOptions_1.TradingContextOptions();
        this.exchanges = undefined;
    }
    return TradingContext;
}());
exports.TradingContext = TradingContext;
//# sourceMappingURL=TradingContext.js.map