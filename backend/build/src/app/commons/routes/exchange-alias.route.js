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
var controller = __importStar(require("../controllers/exchange-alias"));
var express_1 = __importDefault(require("express"));
var exchangeAliasRoutes = express_1.default.Router();
/**
 * @route POST /exchange-alias
 * @group exchange alias
 * @param { ExchangeAlias.model } exchange-alias.body.required
 * @returns { ExchangeAlias.model } 200
 */
exchangeAliasRoutes.route('/').post(controller.createExchangeAlias);
/**
 * @route GET /exchange-alias
 * @group exchange alias
 * @returns { Array.<ExchangeAlias> } 200
 *
 */
exchangeAliasRoutes.route('/').get(controller.getExchangesAlias);
/**
 * @route GET /exchange-alias/exchange/{id}
 * @group exchange alias
 * @param { string } id.path.required
 * @returns { ExchangeAlias.model } 200
 *
 */
exchangeAliasRoutes.route('/exchange/:id').get(controller.getExchangeAliasByExchangeId);
/**
 * @route GET /exchange-alias/{id}
 * @group exchange alias
 * @param { string } id.path.required
 * @returns { ExchangeAlias.model } 200
 *
 */
exchangeAliasRoutes.route('/:id').get(controller.getExchangeAliasById);
/**
 * @route PUT /exchange-alias/{id}
 * @group exchange alias
 * @param { string } id.path.required
 * @param { ExchangeAlias.model } exchange-alias.body.required
 * @returns { ExchangeAlias.model } 200
 *
 */
exchangeAliasRoutes.route('/:id').put(controller.updateExchangeAlias);
/**
 * @route DELETE /exchange-alias/{id}
 * @group exchange alias
 * @param { string } id.path.required
 * @returns { void } 200
 *
 */
exchangeAliasRoutes.route('/:id').delete(controller.deleteExchangeAlias);
exports.default = exchangeAliasRoutes;
//# sourceMappingURL=exchange-alias.route.js.map