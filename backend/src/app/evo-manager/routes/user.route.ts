import { Router } from 'express';
import * as controller from '../controllers/user';

const userRoute = Router();

userRoute.post('/', controller.save);
userRoute.get('/', controller.getAll);
userRoute.get('/:id', controller.getById);

export default userRoute;
