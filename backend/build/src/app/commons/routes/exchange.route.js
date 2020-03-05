"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller = __importStar(require("../controllers/exchange"));
var express_1 = __importDefault(require("express"));
var exchangeRoutes = express_1.default.Router();
/**
 * @route POST /exchange
 * @group exchange
 * @param { Exchange.model } exchange.body.required
 * @returns { Exchange.model } 200
 */
exchangeRoutes.route('/').post(controller.createExchange);
/**
 * @route GET /exchange
 * @group exchange
 * @returns { Array.<Exchange> } 200
 *
 */
exchangeRoutes.route('/').get(controller.getExchanges);
/**
 * @route GET /exchange/{id}
 * @group exchange
 * @param { string } id.path.required
 * @returns { Exchange.model } 200
 *
 */
exchangeRoutes.route('/:id').get(controller.getExchangeById);
/**
 * @route PUT /exchange/{id}
 * @group exchange
 * @param { string } id.path.required
 * @param { Exchange.model } exchange.body.required
 * @returns { Exchange.model } 200
 *
 */
exchangeRoutes.route('/:id').put(controller.updateExchange);
/**
 * @route DELETE /exchange/{id}
 * @group exchange
 * @param { string } id.path.required
 * @returns { void } 200
 *
 */
exchangeRoutes.route('/:id').delete(controller.deleteExchange);
exports.default = exchangeRoutes;
//# sourceMappingURL=exchange.route.js.map