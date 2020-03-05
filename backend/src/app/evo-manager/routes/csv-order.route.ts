import express from 'express';

import * as controller from '../controllers/csv-order';

const csvOrderRoute = express.Router();

csvOrderRoute.post('/', controller.save);
csvOrderRoute.get('/', controller.getAll);
csvOrderRoute.get('/filename/:fileName', controller.getByFileName);
csvOrderRoute.get('/:id', controller.getById);
csvOrderRoute.put('/:id', controller.updateExecutionStatus);

export default csvOrderRoute;
