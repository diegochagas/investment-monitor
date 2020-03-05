"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Band
 * @property { string } T
 * @property { integer} t - timestamp
 * @property { integer} h
 * @property { integer} H
 * @property { integer} l
 * @property { integer} L
 */
var Band = /** @class */ (function () {
    function Band() {
    }
    return Band;
}());
exports.Band = Band;
/**
 * @typedef Candle
 * @property { string } time_period_start - start period - eg: 2017-01-01T00:00:00.0000000Z
 * @property { string } time_period_end - end period - eg: 2017-01-02T00:00:00.0000000Z
 * @property { string } time_open - open time - eg: 2017-01-01T00:01:08.0000000Z
 * @property { string } time_close - close time - eg: 2017-01-01T23:59:46.0000000Z
 * @property { integer } price_open - price open - eg: 966.340000000
 * @property { integer } price_close - price close - eg: 997.750000000
 * @property { integer } price_high - price high - eg: 1005.000000000
 * @property { integer } price_low - price low - eg: 960.530000000
 * @property { integer } volume_traded - volume traded - eg: 6850.593308590
 * @property { integer } trades_count - trades count - eg: 7815
 */
//# sourceMappingURL=Band.js.map