import {Router} from "express";
import * as controller from '../controllers/account';

const accountRoute = Router();

/**
 * @route POST /account/balance
 * @group account
 * @security Bearer
*/
accountRoute.route('/balance').post(controller.accountBalance);

export default accountRoute;
