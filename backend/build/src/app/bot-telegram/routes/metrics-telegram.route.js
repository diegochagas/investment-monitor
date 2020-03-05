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
var controller = __importStar(require("../controllers/metrics-telegram"));
var eventsTelegramRoute = express_1.Router();
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
exports.default = eventsTelegramRoute;
//# sourceMappingURL=metrics-telegram.route.js.map