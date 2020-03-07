import * as controller from '../controllers/exchange-alias';
import express from 'express';

const exchangeAliasRoutes = express.Router();

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

export default exchangeAliasRoutes;
