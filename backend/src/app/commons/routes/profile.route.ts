import * as controller from '../controllers/profile';
import express from 'express';

const profileRoute = express.Router();
/**
 * @route POST /profile
 * @group profile
 * @param { Profile.model } profile.body.required
 * @returns { Profile.model } 200
 */
profileRoute.route('/').post(controller.createProfile);

/**
 * @route PUT /profile
 * @group profile
 * @param { Profile.model } profile.body.required
 * @returns { Profile.model } 200
 */
profileRoute.route('/').put(controller.createProfile);

/**
 * @route GET /profile
 * @group profile
 * @returns { Array.<Profile> } 200
 */
profileRoute.route('/').get(controller.getProfiles);

/**
 * @route GET /profile/{id}
 * @group profile
 * @param { string } id.path.required
 * @returns { Profile.model } 200
 */
profileRoute.route('/:id').get(controller.getProfile);

export default  profileRoute;
