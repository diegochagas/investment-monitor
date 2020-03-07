import express from 'express';
import * as controller from '../controllers/order';

const orderRoute = express.Router();

/**
 * @route GET /order/{instanceId}
 * @group order
 * @param { string } instanceId.path.required
 * @param { integer } limit.query - Quantity orders to return, default = 50 - eg: 10
 * @param { integer } page.query - Pagination - eg: 1
 * @param { string } status.query - Filter status by order, default = OPEN - eg: CANCELED, OPEN, EXECUTED, PARTIALLY_EXECUTED
 * @param { string } sort.query - Orders ordenations by default asc - eg: asc, desc
 * @param { string } Project.header.required
 * @return { Array.<Order> } 200
 */
orderRoute.route('/:instance').get(controller.getOrders);

export default orderRoute
