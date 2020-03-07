/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/
import * as controller from '../controllers/order';
import express from 'express';

const orderRoute = express.Router();

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

export default orderRoute;
