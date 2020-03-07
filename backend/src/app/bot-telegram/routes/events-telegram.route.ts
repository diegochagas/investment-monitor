import { Router } from 'express';
import * as controller  from '../controllers/events-telegram';

const eventsTelegramRoute = Router();

/**
 * @route GET /events/{instance}
 * @group events
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { string } instance.path.required - Instance id -eg: telegram.signals
 * @param { enum } action.query - Action -eg: INDICATORS,ORDERS
 * @param { integer } limit.query - Limit
 * @param { integer } page.query - Page
 * @param { enum } status.query - STATUS -eg: CANCEL,WAITING,CLOSE,OPEN,STOP
 * @security Bearer
 * @return { EventsTelegram.model } 200
*/
eventsTelegramRoute.route('/:instance').get(controller.getEvents);


export default  eventsTelegramRoute;
