import {ApplicationResponse} from "../models/ApplicationResponse";
import logger from "../middlewares/winston";

const moment = require('moment');

const axios = require('axios');

export class ServiceCoinapi {

    private baseUrl = process.env.COINAPI_URI as string;
    private apiKey = process.env.COINAPI_CREDENTIAL
    private HEADER_X_COINAPI_KEY = `X-CoinAPI-Key`;

    async getCandleHistory(symbolId: string, period_id: string, time_start: number, time_end: number, limit) {

        try {
            const start = moment(time_start).toISOString();
            const end = moment(time_end).toISOString();
            const params = {
                period_id,
                time_start: start,
                time_end: end,
            }
            if (limit)
                params['limit'] = limit;
            const response = await axios.get(`${this.baseUrl}v1/ohlcv/${symbolId}/history`, {
                params,
                headers: {
                    [this.HEADER_X_COINAPI_KEY]: this.apiKey
                }
            });
            return new ApplicationResponse(200, response.data);

        } catch (e) {

            if (e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, e.response.data, e.response.data.error)
        }
    }

    async getCandleLatest(symbolId: string, period_id: string, limit: number) {
        try {
            const params = {
                period_id,
            }
            if (limit)
                params['limit'] = limit;
            const response = await axios.get(`${this.baseUrl}v1/ohlcv/${symbolId}/latest`, {
                params,
                headers: {
                    [this.HEADER_X_COINAPI_KEY]: this.apiKey
                }
            });
            return new ApplicationResponse(200, response.data);

        } catch (e) {
            if (e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, e.response.data, e.response.data.error)
        }
    }
}
