import * as controller from '../controllers/route';
import express from 'express';

const routeRoutes = express.Router();

/**
 * @route GET /route
 * @group route
 * @returns { Array.<Route> } 200
 */
routeRoutes.route('/').get(controller.getRoutes);

export default  routeRoutes;
