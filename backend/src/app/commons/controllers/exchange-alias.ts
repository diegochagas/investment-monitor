import { Request, Response } from "express";
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceExchangeAlias} from "../services/service.exchange-alias";

export const createExchangeAlias = async (req: Request, res: Response) => {

    try {
        const response =  await ServiceExchangeAlias.createExchangeAlias(req.body);
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};

export const getExchangesAlias = async (req: Request, res: Response) => {
    try {
        const response = await ServiceExchangeAlias.getExchangeAlias();
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};

export const getExchangeAliasById = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceExchangeAlias.getExchangeAliasById(req.params.id);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getExchangeAliasByExchangeId = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceExchangeAlias.getExchangeAliasByExchangeId(req.params.id);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const updateExchangeAlias = async (req: Request, res: Response) => {

    try {
        const response = await ServiceExchangeAlias.updateExchangeAlias(req.params.id, req.body);
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }

};

export const deleteExchangeAlias = async (req: Request, res: Response) => {

    try {
        const response = await ServiceExchangeAlias.deleteExchangeAlias(req.params.id)
        res.status(response.statusCode).json({ status: true, message: 'Exchange deleted' });
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};
