import bodyParser from 'body-parser';
import cors from 'cors';
import {auth} from '../../../shared/helpers/express-firebase-custom-auth';
import authRouteMiddleware from '../../../shared/middlewares/auth-route';
import validateHeader from "../../../shared/middlewares/validate-header";
import {Application} from 'express';

const addRequestId = require('express-request-id')();

export const configMiddleware = (app: Application) => {
    app.use(addRequestId);
    app.use(bodyParser.json());
    app.use(cors());
    // app.use(validateHeader);
    if(process.env.NODE_ENV !== 'local') {
        //app.use('/', auth);
        //app.use(authRouteMiddleware);
    }
};
