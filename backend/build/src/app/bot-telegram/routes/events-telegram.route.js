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
var controller = __importStar(require("../controllers/events-telegram"));
var eventsTelegramRoute = express_1.Router();
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
exports.default = eventsTelegramRoute;
//# sourceMappingURL=events-telegram.route.js.map