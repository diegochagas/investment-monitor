import { Request, Response } from 'express';
import {ApplicationResponse} from '../../../shared/models/ApplicationResponse';
import {DynamicRoutes} from "../../../shared/helpers/dynamicRoutes";

/**
 * @typedef Route
 * @property { string } pageName - Name of page - eg: Dashboard
 * @property { string } path - Path of api - eg: /route
 */
export const getRoutes = (req: Request, res: Response) => {
    const routes = DynamicRoutes.getApplications().map(app => ({
        name: app.name,
        pages: app.pages.map( page => ({
           path: page.path,
           rule: 'read'
        }))
    }));
    res.status(200).json(new ApplicationResponse(200, routes));
};
