import bodyParser from 'body-parser';
import express, { Application } from "express";
import cors from 'cors';
import {auth} from '../../../shared/helpers/express-firebase-custom-auth';
import authRouteMiddleware from '../../../shared/middlewares/auth-route';
import routeRoutes from "../routes/routes.route";
import validateHeader from "../../../shared/middlewares/validate-header";

const addRequestId = require('express-request-id')();

export const configMiddleware = (app: Application) => {
    app.use(addRequestId);
    app.use(bodyParser.json());
    app.use(cors());
    app.use(validateHeader);
    if(process.env.NODE_ENV !== 'local') {
        app.use('/', auth);
        app.use(authRouteMiddleware);
    }
};


export const configRoute = (app: Application) => {
    const appRoute = express();
    appRoute.use('/', routeRoutes);
    app.use('/route', appRoute);
    appRoute.use(addRequestId);
    appRoute.use(bodyParser.json());
    appRoute.use(cors());
};
