import { Request, Response } from 'express';
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceCsvOrder} from "../services/service.csv-order";

export const save = async (req: Request, res: Response) => {

    try {
        const response = await ServiceCsvOrder.save(req.body);
        res.status(response.statusCode).json(response);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getAll = async (req: Request, res: Response) => {

    try {
        const response = await ServiceCsvOrder.getAll(req.query);
        res.status(response.statusCode).json(response);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getById = async (req: Request, res: Response) => {

    try {
        const response = await ServiceCsvOrder.getById(req.params.id);
        res.status(response.statusCode).json(response);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getByFileName = async (req: Request, res: Response) => {

    try {
        const response = await ServiceCsvOrder.getByFileName(req.params.fileName);
        res.status(response.statusCode).json(response);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const updateExecutionStatus = async (req: Request, res: Response) => {

    try {
        const response = await ServiceCsvOrder.updateExecutionStatus(req.params.id, req.body);
        res.status(response.statusCode).json(response);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
