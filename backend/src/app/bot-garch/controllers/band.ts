import {Request, Response} from 'express';
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceBand} from "../services/service.band";
import {TradeWindow} from "../../strategy/models/strategy/configs/GarchConfig";

export const getBands = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceBand.getBand(TradeWindow[req.params.band as string], req.query);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
