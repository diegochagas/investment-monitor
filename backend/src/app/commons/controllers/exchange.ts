import { Request, Response } from "express";
import {ServiceExchange} from "../services/service.exchange";
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";

export const createExchange = async (req: Request, res: Response) => {

    try {
        const response =  await ServiceExchange.createExchange(req.body);
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};

export const getExchanges = async (req: Request, res: Response) => {
    try {
        const response = await ServiceExchange.getExchange();
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};

export const getExchangeById = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceExchange.getExchangeById(req.params.id);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const updateExchange = async (req: Request, res: Response) => {

    try {
        const response = await ServiceExchange.updateExchange(req.params.id, req.body);
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }

};

export const deleteExchange = async (req: Request, res: Response) => {

    try {
        const response = await ServiceExchange.deleteExchange(req.params.id)
        res.status(response.statusCode).json({ status: true, message: 'Exchange deleted' });
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};
