import { Request, Response} from 'express';
import {HEADER_PROJECT_NAME} from "../util/factorPool";
import {HeaderProject} from "../models/enum/projectName";
import {ApplicationResponse} from "../models/ApplicationResponse";
const ignorePath = ['api-docs', 'api-docs.json'];
export default function validateHeader(req: Request, res: Response, next) {
    if(ignorePath.includes(req.path.split('/')[1])) return next();
    if(!req.header(HEADER_PROJECT_NAME))
        return res.status(428).json(new ApplicationResponse(428, {}, `Header '${HEADER_PROJECT_NAME}' is not defined`));

    if(!Object.keys(HeaderProject).includes(req.header(HEADER_PROJECT_NAME) as string))
        return res.status(412).json(new ApplicationResponse(412, {}, `Project name not found`));
    else next();
}
