"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller = __importStar(require("../controllers/balance"));
var balanceRoute = express_1.default.Router();
/**
 * @route GET /balance
 * @group balance
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { integer } startDate - init Date - eg: 1468393552000
 * @param { integer } endDate - final Date - eg: 1568839153000
 * @param { string } mainCurrency - Choose which symbol will receive values, default = BTC - eg: ETH, USDT
 * @security Bearer
 * @return { IBalanceResponse.model } 200
 */
balanceRoute.route('/').get(controller.getBalance);
/**
 * @route GET /balance/currency
 * @group balance
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @security Bearer
 * @return { string[] } 200
 */
balanceRoute.route('/currency').get(controller.getCurrencies);
exports.default = balanceRoute;
//# sourceMappingURL=balance.route.js.map