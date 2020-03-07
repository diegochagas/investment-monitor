import { Request, Response } from 'express';
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceMetricTelegram} from "../services/service.metrics-telegram";

export const getMetricSums = async (req: Request, res: Response) => {
    try {
        const response = await ServiceMetricTelegram.getSumMetrics(req.params.instance, req.query);
        res.status(response.statusCode).json(response);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getMetricChannelBalances = async (req: Request, res: Response) => {
    try {
        const response = await ServiceMetricTelegram.getChannelBalances(req.params.instance, req.query);
        res.status(response.statusCode).json(response);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};



