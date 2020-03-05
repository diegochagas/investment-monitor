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
var controller = __importStar(require("../controllers/header"));
var headerRoutes = express_1.default.Router();
/**
 * @route GET /header
 * @group header
 * @returns { Array.<string> } 200
 * @param { enum } Project.header.required - Strategy type - eg: GARCH, MARKET_MAKER, TELEGRAM
 */
headerRoutes.route('/').get(controller.getHeaders);
exports.default = headerRoutes;
//# sourceMappingURL=header.route.js.map