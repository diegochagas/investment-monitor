"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller = __importStar(require("../controllers/candle"));
var candleRoute = express_1.Router();
/**
 * @route GET /candle/history
 * @group candle
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { string } symbol_id.query.required - property coinApiRest of Strategy - eg: BINANCE_SPOT_BTC_USD
 * @param { enum } period.query.required - TradeWindow - eg: 4MIN,5MIN,6MIN,10MIN,15MIN,30MIN,4HRS,5HRS,6HRS,10HRS,15HRS,30HRS
 * @param { integer } start.query.required - start date in timestamp
 * @param { integer } end.query.required - end date in timestamp
 * @param { integer } limit.query - quantity items to return (default: 100) - eg : 100
 * @security Bearer
 * @return { Array.<Candle> } 200
*/
candleRoute.route('/history').get(controller.getCandleHistory);
/**
 * @route GET /candle/latest
 * @group candle
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { string } symbol_id.query.required - property coinApiRest of Strategy - eg: BINANCE_SPOT_BTC_USD
 * @param { enum } period.query.required - TradeWindow - eg: 4MIN,5MIN,6MIN,10MIN,15MIN,30MIN,4HRS,5HRS,6HRS,10HRS,15HRS,30HRS
 * @param { integer } limit.query - quantity items to return (default: 100) - eg : 100
 * @security Bearer
 * @return { Array.<Candle> } 200
 */
candleRoute.route('/latest').get(controller.getCandleLatest);
exports.default = candleRoute;
//# sourceMappingURL=candle.route.js.map