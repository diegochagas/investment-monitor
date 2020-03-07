import {Request, Response} from "express";
import {HEADER_PROJECT_NAME} from "../../../shared/util/factorPool";
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceBotEvents} from "../services/service.bot-events";

export const getEvents = async (req: Request, res: Response) => {
    try {
        const project = req.header(HEADER_PROJECT_NAME) as string;
        const serviceResponse = await ServiceBotEvents.getEvent(project, req.query);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
