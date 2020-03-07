import { Request, Response } from 'express';
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceEventsTelegram} from "../services/service.events-telegram";

export const getEvents = async (req: Request, res: Response) => {
    try {
        const response = await ServiceEventsTelegram.getEvents(req.params.instance, req.query);
        res.status(response.statusCode).json(response);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};



