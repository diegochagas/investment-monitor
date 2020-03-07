import { Router } from 'express';
import * as controller  from '../controllers/metrics-telegram';

const eventsTelegramRoute = Router();

/**
 * @route GET /metrics/sum/{instance}
 * @group events
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { string } instance.path.required - Instance id -eg: telegram.signals
 * @param { integer } start.query.required - Start
 * @param { integer } end.query.required - End
 * @param { string } query.groups - Groups
 * @security Bearer
 * @return { MetricsTelegramSumsResponse.model } 200
*/
eventsTelegramRoute.route('/sum/:instance').get(controller.getMetricSums);


/**
 * @route GET /metrics/channel-balances/{instance}
 * @group events
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { string } instance.path.required - Instance id -eg: telegram.signals
 * @param { integer } start.query.required - Start
 * @param { integer } end.query.required - End
 * @security Bearer
 * @return { MetricsTelegramSumsResponse.model } 200
*/
eventsTelegramRoute.route('/channel-balances/:instance').get(controller.getMetricChannelBalances);


export default  eventsTelegramRoute;
