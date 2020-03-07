import {Request, Response} from "express";
import { ServiceInstance } from '../services/service.instance';
import { ExceptionResponse } from '../../../shared/models/ExceptionResponse';
import {Instance, InstanceType} from "../models/instance/Instance";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {HEADER_PROJECT_NAME} from "../../../shared/util/factorPool";


export const getInstances = async (req: Request, res: Response) => {
    try {
        const strategyType = req.header(HEADER_PROJECT_NAME) as string;
        const serviceResponse = await new ServiceInstance().getInstances(strategyType);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
}

export const createInstance = async (req: Request, res: Response) => {
    res.status(400).json(new ApplicationResponse(400, '', 'Não é permitido criar uma instancia'));
};

export const deleteInstance = async (req: Request, res: Response) => {
    res.status(400).json(new ApplicationResponse(400, '', 'Não é permitido excluir uma instancia'));
};

export const produceInstanceStrategy = async (req: Request, res: Response) => {
    try {
        const strategyType = req.header(HEADER_PROJECT_NAME) as string;
        const serviceResponse = await new ServiceInstance().produceInstanceStrategy(req.params, req.body, strategyType);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const produceInstanceStatus = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await new ServiceInstance().produceInstanceStatus(req.params, req.body);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const getStatusIntances = async (req: Request, res: Response) => {
    try {
        const serviceResponse = await new ServiceInstance().produceStatusIntances();
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};

export const upsertInstance = (instance: Instance): any => {
    return new ServiceInstance().upsertInstance(instance);
};

export const refreshInstances = async (req: Request, res: Response) => {
    try {
        const strategyType = req.header(HEADER_PROJECT_NAME) as string;
        const serviceResponse = await new ServiceInstance().refreshInstances(InstanceType[strategyType]);
        res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
}
