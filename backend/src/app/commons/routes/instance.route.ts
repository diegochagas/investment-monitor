import express from 'express';
import * as controller from '../controllers/instance'

const instanceRoutes = express.Router();

/**
 * @route GET /instance
 * @group exchange
 * @returns { Instance.model } 200
 *
 */
// GET all instances
instanceRoutes.route('/').get(controller.getInstances);

/**
 * @route POST /instance
 * @group instance
 * @param { Instance.model } exchange.body.required
 * @returns { Instance.model } 200
 */
// POST instance
instanceRoutes.route('/').post(controller.createInstance);

/**
 * @route PUT /instance/{id}
 * @group instance
 * @param { string } id.path.required
 * @param { Instance.model } instance.body.required
 * @returns { Instance.model } 200
 *
 */
// PUT instance
instanceRoutes.route('/:id').put(controller.produceInstanceStrategy);

/**
 * @route DELETE /instance/{id}
 * @group instance
 * @param { string } id.path.required
 * @returns { void } 200
 */
// DELETE instance
instanceRoutes.route('/:id').delete(controller.deleteInstance);

/**
 * @route PUT /instance/{id}/action
 * @group instance
 * @param { string } id.path.required
 * @param { string } action.body.required - Action - restart
 * @returns { void } 200
 *
 */
// Turn instance on/off
instanceRoutes.route('/:id/action').put(controller.produceInstanceStatus);

/**
 * @route POST /instance/refresh
 * @group instance
 * @returns { boolean } 200
 */
// Request instances status refresh
instanceRoutes.route('/refresh').post(controller.refreshInstances);

/**
 * @route GET /instance/refresh
 * @group instance
 * @returns { boolean } 200
 */
instanceRoutes.route('/status').get(controller.getStatusIntances);

export default instanceRoutes;
