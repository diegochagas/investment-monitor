import { Request, Response } from "express";
import {ServiceGroup} from "../services/service.group";
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";

export const createGroup = async (req: Request, res: Response) => {
    try {
        const response =  await ServiceGroup.createGroup(req.body);
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};

export const getGroups = async (req: Request, res: Response) => {
    try {
        const response = await ServiceGroup.getGroup();
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};

export const getGroupById = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceGroup.getGroupById(req.params.id);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const updateGroup = async (req: Request, res: Response) => {
    try {
        const response = await ServiceGroup.updateGroup(req.params.id, req.body);
        res.status(response.statusCode).json(response);
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};

export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const response = await ServiceGroup.deleteGroup(req.params.id);
        res.status(response.statusCode).json({ status: true, message: 'Group deleted' });
    }catch(err) {
        const error = ExceptionResponse.exec(err);
        res.status(error.statusCode).json(error);
    }
};
