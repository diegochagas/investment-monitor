import express from 'express';
import * as controller from '../controllers/balance';
const balanceRoute = express.Router();

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

export default balanceRoute