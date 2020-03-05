import { Router } from 'express';
import * as controller from '../controllers/secret-keys';

const secretKeyRoute = Router();

secretKeyRoute.post('/', controller.save);
secretKeyRoute.get('/', controller.get);
secretKeyRoute.put('/', controller.update);
secretKeyRoute.delete('/', controller.exclude);

export default secretKeyRoute;
