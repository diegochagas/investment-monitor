import {Request, Response} from 'express';
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceLiquidate} from "../services/service.liquidate";

export const liquidate = async (req: Request, res: Response) => {
    try {
        const response = await new ServiceLiquidate().liquidExposition(req.body.side, req.body.value, req.body.instance, req.body.strategy);
        res.status(response.statusCode).json(response);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
