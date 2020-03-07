import bodyParser from 'body-parser';
import { Application } from "express";
import cors from 'cors';
import authRouteMiddleware from "../../../shared/middlewares/auth-route";
import {auth} from '../../../shared/helpers/express-firebase-custom-auth';
import validateHeader from "../../../shared/middlewares/validate-header";

const addRequestId = require('express-request-id')();

export const configMiddleware = (app: Application) => {
    // require('../../middlewares/firebase');
    app.use(addRequestId);
    app.use(bodyParser.json());
    app.use(cors());
    //
    app.use(validateHeader);
    if(process.env.NODE_ENV !== 'local') {
        app.use('/', auth);
        app.use(authRouteMiddleware);
    }
};
