import * as controller from '../controllers/exchange';
import express from 'express';

const exchangeRoutes = express.Router();

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

export default exchangeRoutes;
