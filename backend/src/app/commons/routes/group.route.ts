import * as controller from '../controllers/group';
import express from 'express';

const groupRoutes = express.Router();

/**
 * @route POST /group
 * @group group
 * @param { Group.model } group.body.required
 * @returns { Group.model } 200
 */
groupRoutes.route('/').post(controller.createGroup);

/**
 * @route GET /group
 * @group group
 * @returns { Array.<Group> } 200
 *
 */
groupRoutes.route('/').get(controller.getGroups);

/**
 * @route GET /group/{id}
 * @group group
 * @param { string } id.path.required
 * @returns { Group.model } 200
 *
 */
groupRoutes.route('/:id').get(controller.getGroupById);

/**
 * @route PUT /group/{id}
 * @group group
 * @param { string } id.path.required
 * @param { Group.model } group.body.required
 * @returns { Group.model } 200
 *
 */
groupRoutes.route('/:id').put(controller.updateGroup);

/**
 * @route DELETE /group/{id}
 * @group group
 * @param { string } id.path.required
 * @returns { void } 200
 *
 */
groupRoutes.route('/:id').delete(controller.deleteGroup);

export default groupRoutes;
