import { Request, Response } from 'express';
import {ExceptionResponse} from '../../../shared/models/ExceptionResponse';
import {ServiceExecutedStrategies} from "../services/service.executed-strategies";

export const getExecutedStrategies = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceExecutedStrategies.getExecutedStrategies(req.query.startDate, req.query.endDate);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
