import { Request, Response } from "express";
import { ServiceOrder } from '../services/service.order';
import { ExceptionResponse } from '../../../shared/models/ExceptionResponse';


export const getOrders = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await new ServiceOrder().getDashOrders(req.params.instance, req.query);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await new ServiceOrder().createOrder(req.body);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
