import {Request, Response} from "express";
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ServiceTopic} from "../services/service.topic";

export const getTopics = async (req: Request, res: Response) => {
    try {
        const response = await ServiceTopic.getTopics();
        res.status(response.statusCode).json(response);
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getTopicById = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await ServiceTopic.getTopicById(req.params.id);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const createTopic = async (req: Request, res: Response) => {
    try {
        const response = await ServiceTopic.createTopic(req.body);
        res.status(response.statusCode).json(response);
    }catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const updateTopic = async (req: Request, res: Response) => {
    try {
        const response = await ServiceTopic.updateTopic(req.params.id, req.body);
        res.status(response.statusCode).json(response)
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const deleteTopic = async (req: Request, res: Response) => {
    try {
        const response = await ServiceTopic.deleteTopic(req.params.id);
        res.status(response.statusCode).json(response)
    }catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
