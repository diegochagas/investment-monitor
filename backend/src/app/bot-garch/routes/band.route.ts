import express = require("express");
import * as controller from '../controllers/band'
const bandRoute = express.Router()

/**
 * @route GET /band/{band}
 * @group band
 * @param { enum } band.path.required - TradeWindow - eg: 4MIN,5MIN,6MIN,10MIN,15MIN,30MIN,4HRS,5HRS,6HRS,10HRS,15HRS,30HRS
 * @param { integer } dtIni.query.required - start date in timestamp
 * @param { integer } dtFim.query.required - finish date in timestamp
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-telegram,bot-maker,general-system
 * @return { Array.<Band> } 200
 * @secutiry Bearer
 */
bandRoute.route('/:band').get(controller.getBands);

export default bandRoute;
