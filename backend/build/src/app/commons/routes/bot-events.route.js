"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var controller = __importStar(require("../controllers/bot-events"));
var botEventsRoutes = express.Router();
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
exports.default = botEventsRoutes;
//# sourceMappingURL=bot-events.route.js.map