"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controller = __importStar(require("../controllers/band"));
var bandRoute = express.Router();
/**
 * @route GET /band/{band}
 * @group band
 * @param { enum } band.path.required - TradeWindow - eg: 4MIN,5MIN,6MIN,10MIN,15MIN,30MIN,4HRS,5HRS,6HRS,10HRS,15HRS,30HRS
 * @param { integer } dtIni.query.required - start date in timestamp
 * @param { integer } dtFim.query.required - finish date in timestamp
 * @param { enum } Project.header.required - Project name - eg: bot-garch,bot-telegram,bot-maker,general-system
 * @return { Array.<Band> } 200
 * @secutiry Bearer
 */
bandRoute.route('/:band').get(controller.getBands);
exports.default = bandRoute;
//# sourceMappingURL=band.route.js.map