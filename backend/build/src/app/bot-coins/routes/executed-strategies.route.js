"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller = __importStar(require("../controllers/executed-strategies"));
var executedStrategiesRoute = express_1.default.Router();
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
exports.default = executedStrategiesRoute;
//# sourceMappingURL=executed-strategies.route.js.map