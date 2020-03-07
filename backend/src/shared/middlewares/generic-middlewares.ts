import bodyParser from 'body-parser';
import { Application } from "express";
import cors from 'cors';
import authRouteMiddleware from './auth-route';
import {auth} from '../helpers/express-firebase-custom-auth';
import validateHeader from './validate-header';

const addRequestId = require('express-request-id')();
export const configGenericMiddleware = (app: Application) => {
    app.use(addRequestId);
    app.use(bodyParser.json());
    app.use(cors());
    app.use(validateHeader);
    if(process.env.NODE_ENV !== 'local') {
        app.use('/', auth);
        app.use(authRouteMiddleware);
    }
};
