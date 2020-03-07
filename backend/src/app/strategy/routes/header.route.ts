import express from "express";
import * as controller from "../controllers/header"
const headerRoutes = express.Router();

/**
 * @route GET /header
 * @group header
 * @returns { Array.<string> } 200
 * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
 */
headerRoutes.route('/').get(controller.getHeaders);

export default headerRoutes
