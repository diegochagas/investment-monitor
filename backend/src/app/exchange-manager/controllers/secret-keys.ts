import { Request, Response } from 'express';
import {ServiceSecretKeys} from "../services/service.secret-keys";
export const save = async (req: Request, res: Response) => {
    try {
        const response = await ServiceSecretKeys.save(req.body);
        res.status(response.statusCode).json(response)
    }catch(e) {
        res.status(400).json({ message: e.message })
    }
};

export const get = async (req: Request, res: Response) => {
    try {
        if(!req.query.secretId) {
            return res.status(400).json({ statusCode: 400, data: {}, message: 'Please provide an secretId' })
        }
        const response = await ServiceSecretKeys.get(decodeURIComponent(req.query.secretId));
        res.status(response.statusCode).json(response)
    }catch(e) {
        res.status(400).json({ message: e.message })
    }
};

export const exclude = async (req: Request, res: Response) => {
    try {
        const response = await ServiceSecretKeys.delete(decodeURIComponent(req.query.secretId));
        res.status(response.statusCode).json(response)
    }catch(e) {
        res.status(400).json({ message: e.message })
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const response = await ServiceSecretKeys.update(req.body);
        res.status(response.statusCode).json(response)
    }catch(e) {
        res.status(400).json({ message: e.message })
    }
};
