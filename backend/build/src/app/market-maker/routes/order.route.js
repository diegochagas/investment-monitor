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
/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/
var controller = __importStar(require("../controllers/order"));
var express_1 = __importDefault(require("express"));
var orderRoute = express_1.default.Router();
/**
 * @route GET /order/{instanceId}
 * @group order
 * @param { string } instanceId.path.required
 * @param { integer } limit.query - Quantity orders to return, default = 50 - eg: 10
 * @param { integer } page.query - Pagination - eg: 1
 * @param { string } status.query - Filter status by order, default = OPEN - eg: CANCELED, OPEN, EXECUTED, PARTIALLY_EXECUTED
 * @param { string } sort.query - Orders ordenations by default asc - eg: asc, desc
 * @returns { Array.<Order> } 200
 */
orderRoute.route('/:instance').get(controller.getOrders);
/**
 * @route POST /order
 * @group order
 * @param { Order.model } order.body.required
 * @returns { Order.model } 200
 */
orderRoute.route('/').post(controller.createOrder);
exports.default = orderRoute;
//# sourceMappingURL=order.route.js.map