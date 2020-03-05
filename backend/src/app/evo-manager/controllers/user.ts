import {Request, Response} from 'express';
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceUser} from "../services/service.user";

export const save = async (req: Request, res: Response) => {
    try {
        const response = await ServiceUser.save(req.body);
        res.status(response.statusCode).json(response);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const response = await ServiceUser.getAll();
        res.status(response.statusCode).json(response);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const response = await ServiceUser.getById(req.params.id);
        res.status(response.statusCode).json(response);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
