import * as express from 'express';
import * as controller from "../controllers/bot-events";
const botEventsRoutes = express.Router();

/**
 * @route GET /bot-events
 * @group Events
 * @param { string } Project.header.required
 * @param { string } type.query.required
 * @param { string } instance.query.required
 * @returns { BotEvents.model } 200
 *
 */
botEventsRoutes.route('/').get(controller.getEvents);

export default  botEventsRoutes
