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
var controller = __importStar(require("../controllers/liquidate"));
var liquidateRoute = express_1.Router();
/**
 * @route POST /liquidate
 * @group liquidate
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-maker,bot-telegram,general-system
 * @param { LiquidateRequest.model } params.body.required
 * @security Bearer
 * @return { LiquidateResponse.model } 200
*/
liquidateRoute.route('/').post(controller.liquidate);
exports.default = liquidateRoute;
//# sourceMappingURL=liquidate.route.js.map