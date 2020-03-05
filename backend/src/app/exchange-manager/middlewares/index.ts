import {Application} from "express";
import {configGenericMiddleware} from "../../../shared/middlewares/generic-middlewares";

export const configMiddleware = (app: Application) => {
    configGenericMiddleware(app)
};
