import { Request, Response } from 'express';
import {ExceptionResponse} from '../../../shared/models/ExceptionResponse';
import {ServiceBalance} from "../services/service.balance";

export const getBalance = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceBalance.getBalanceDifference(req.query.startDate, req.query.endDate, req.query.mainCurrency);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getCurrencies = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceBalance.getCurrencies();
        res.status(serviceResponse.statusCode).json(serviceResponse);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};