import { Request, Response } from 'express';
import {ServiceCoinapi} from '../../../shared/services/service.coinapi';
import {ExceptionResponse} from "../../../shared/models/ExceptionResponse";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";

export const getCandleHistory = async (req: Request, res: Response) => {
  try {
    const coinApi = new ServiceCoinapi();
      if (!req.query.period || !req.query.symbolId)
          res.status(400).json({
              statusCode: 400,
              message: `query params symbolId and period is required`
          } as ApplicationResponse<any>)
      const limit = req.query.limit ? parseInt(req.query.limit) : 100;
      const response = await coinApi.getCandleHistory(req.query.symbolId, req.query.period, parseInt(req.query.start), parseInt(req.query.end), limit);
      res.status(response.statusCode).json(response)
  } catch(e) {
      const error = ExceptionResponse.exec(e);
      res.status(error.statusCode).json(error);
  }
};

export const getCandleLatest= async (req: Request, res: Response) => {
    try {
        if (!req.query.period || !req.query.symbolId)
            res.status(400).json({
                statusCode: 400,
                message: `query params symbolId and period is required`
            } as ApplicationResponse<any>)
        const limit = req.query.limit ? parseInt(req.query.limit) : 100;
        const coinApi = new ServiceCoinapi();
        const response = await coinApi.getCandleLatest(req.query.symbolId, req.query.period, limit);
        res.status(response.statusCode).json(response)
    } catch(e) {
        const error = ExceptionResponse.exec(e);
        res.status(error.statusCode).json(error);
    }
};
