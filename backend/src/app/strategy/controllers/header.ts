import {Request, Response} from "express";
import {HEADER_PROJECT_NAME, services} from "../../../shared/util/factorPool";
import {ServiceStrategy} from "../services/service.strategy";
import {Typegoose} from "typegoose";
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import logger from "../../../shared/middlewares/winston";
import {HeaderProject} from "../../../shared/models/enum/projectName";

export const getHeaders = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await (services.get(HeaderProject[req.header(HEADER_PROJECT_NAME) as string]) as ServiceStrategy<any, Typegoose>).getHeaders();
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        logger.error(`STRATEGY_GET_HEADERS (${e.message}) =>`, e);
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
