import { Request, Response } from 'express';
import {ServiceAccount} from "../services/service.account";
export const accountBalance = async (req: Request, res: Response) => {
    try {
        const response = await new ServiceAccount().accountBalance(req.body);
        res.status(200).json(response);
    }catch(e) {
        res.status(400).json({ message: e.message })
    }
}
