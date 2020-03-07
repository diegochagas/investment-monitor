"use strict";
/**
 * @typedef MetricsTelegramSumsResponse
 * @property { integer } periodTrade
 * @property { integer } activeTrade
 * @property { integer } gains
 * @property { integer } losses
 * @property { integer } finishedTrades
*/
Object.defineProperty(exports, "__esModule", { value: true });
var MetricsTelegramSumsResponse = /** @class */ (function () {
    function MetricsTelegramSumsResponse() {
        this.periodTrade = undefined;
        this.activeTrade = undefined;
        this.gains = undefined;
        this.losses = undefined;
        this.finishedTrades = undefined;
    }
    return MetricsTelegramSumsResponse;
}());
exports.MetricsTelegramSumsResponse = MetricsTelegramSumsResponse;
/**
 * @typedef MetricsTelegramChannelBalancesResponse
 * @property { string } name
 * @property { Array.<integer> } data
 */
var MetricsTelegramChannelBalancesResponse = /** @class */ (function () {
    function MetricsTelegramChannelBalancesResponse() {
    }
    return MetricsTelegramChannelBalancesResponse;
}());
exports.MetricsTelegramChannelBalancesResponse = MetricsTelegramChannelBalancesResponse;
//# sourceMappingURL=MetricsTelegramResponse.js.map