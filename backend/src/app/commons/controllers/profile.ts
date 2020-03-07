import { Request, Response } from 'express';
import {ExceptionResponse} from '../../../shared/models/ExceptionResponse';
import {ServiceProfile} from '../services/service.profile';

export const createProfile = async (req: Request, res: Response) => {
    try {
        const response =  await ServiceProfile.createProfile(req.body);
        res.status(response.statusCode).json(response);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getProfiles = async(req: Request, res: Response) => {
    try {
        const response = await ServiceProfile.getProfiles();
        res.status(response.statusCode).json(response);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getProfile = async(req: Request, res: Response) => {
    try {
        const response = await ServiceProfile.getProfile(req.params.id);
        res.status(response.statusCode).json(response);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
