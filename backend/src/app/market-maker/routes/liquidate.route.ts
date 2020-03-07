import { Router } from 'express';
import * as controller from '../controllers/liquidate';

const liquidateRoute = Router();

/**
 * @route POST /liquidate
 * @group liquidate
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { LiquidateRequest.model } params.body.required
 * @security Bearer
 * @return { LiquidateResponse.model } 200
*/
liquidateRoute.route('/').post(controller.liquidate);

export default liquidateRoute;
