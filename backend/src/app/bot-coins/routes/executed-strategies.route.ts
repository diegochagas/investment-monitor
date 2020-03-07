import express from 'express';
import * as controller from '../controllers/executed-strategies';
const executedStrategiesRoute = express.Router();

/**
 * @route GET /executed-strategies
 * @group executed-strategies
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { integer } startDate - init Date - eg: 1468393552000
 * @param { integer } endDate - final Date - eg: 1568839153000
 * @security Bearer
 * @return { Array.<Operation.model> } 200
 */
executedStrategiesRoute.route('/').get(controller.getExecutedStrategies);

export default executedStrategiesRoute
