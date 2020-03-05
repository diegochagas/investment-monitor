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
var controller = __importStar(require("../controllers/strategy"));
var strategyRoutes = express_1.default.Router();
/**
 * @route POST /config
 * @group config
 * @param { AbstractStrategy.model } strategy.body.required
 * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
 * @returns { AbstractStrategy.model } 200
 */
// Defined store route
strategyRoutes.route('/').post(controller.createStrategy);
/**
 * @route GET /config
 * @group config
 * @returns { Array.<AbstractStrategy> } 200
 * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
 */
// Defined get data(index or listing) route
strategyRoutes.route('/').get(controller.getStrategies);
/**
 * @route GET /config/{id}
 * @group config
 * @param { string } id.path.required
 * @returns { AbstractStrategy.model } 200
 * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
 */
// Defined edit route
strategyRoutes.route('/:id').get(controller.getStrategyById);
// /**
//  * @route PUT /config/{id}
//  * @group config
//  * @param { string } id.path.required
//  * @param { AbstractStrategy.model } strategy.body.required
//  * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
//  * @returns { AbstractStrategy.model } 200
//  *
//  */
// // Defined update route
// strategyRoutes.route('/:id').put(controller.updateStrategy);
// /**
//  * @route DELETE /config/{id}
//  * @group config
//  * @param { string } id.path.required
//  * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
//  * @returns { void } 200
//  *
//  */
// // Defined delete | remove | destroy route
// strategyRoutes.route('/:id').delete(controller.deleteStrategy);
/**
 * @route PUT /config/{id}/inactive
 * @group config
 * @param { string } id.path.required
 * @returns { void } 200
 * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
 */
strategyRoutes.route('/:id/inactive').post(controller.disableStrategy);
/**
 * @route PUT /config/{id}/active
 * @group config
 * @param { string } id.path.required
 * @returns { void } 200
 * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
 */
strategyRoutes.route('/:id/active').post(controller.enableStrategy);
exports.default = strategyRoutes;
//# sourceMappingURL=strategy.route.js.map