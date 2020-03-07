import {Request, Response} from "express";
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceOrder} from "../services/service.order";

export const getOrders = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceOrder.getOrders(req.params.instance, req.query);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
