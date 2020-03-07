import {Request, Response} from "express";
import {ApplicationResponse} from "../models/ApplicationResponse";
import {HEADER_PROJECT_NAME} from "../util/factorPool";

const admin = require('./firebase');
const ignorePath = ['api-docs', 'api-docs.json', 'route'];
export default async function authRouteMiddleware(req: Request, res: Response, next) {
    if(ignorePath.includes(req.path.split('/')[1])) return next();

    const db = admin.firestore();

    const user = await db.collection(`users`).doc(res.locals.user.uid).get();
    const profile = await db.collection(`profile`).doc(user.data().profile).get();
    const appName = req.header(HEADER_PROJECT_NAME) as string;
    const application = profile.data().applications.find(app => app.name === appName);

    if (!application)
        return res.status(404).json(new ApplicationResponse(404, {}, `Application ${appName} not found`));

    // const page = application.pages.find(page => page.endPoint === `/${req.path.split('/')[1]}`);
    const page = application.pages.find(page => page.endPoint.find(endpoint => endpoint === `/${req.path.split('/')[1]}`));
    if(!page)
        return res.status(403).json(new ApplicationResponse(403, {}, `You has not access to ${req.path}`));

    if(req.method !== 'GET' && page.rule !== 'write') {
        return res.status(403).json(new ApplicationResponse(403, {}, `You has not access to write in ${req.path}`));
    } else {
        next();
    }
}
