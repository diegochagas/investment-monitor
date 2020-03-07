import { ApplicationResponse } from "../../../shared/models/ApplicationResponse";
import { EventsTelegramSchema } from "../models/EventTelegram";
import { Action } from "../models/enums/Actions"
import { ContentStatus } from "../models/enums/ContentStatus"
import { MetricsTelegramSumsResponse, MetricsTelegramChannelBalancesResponse } from '../models/MetricsTelegramResponse'
export class ServiceMetricTelegram {

    static async getSumMetrics(instance: string, query: {
        start: number,
        end: number,
        groups: string,
    }) {

        try {

            if (!query.start || !query.end) {
                throw new ApplicationResponse(400, {}, 'Error to get sumMetrics start and end is required')
            }
            const filter = { instance } as any;
            filter.timestamp = { $gte: query.start, $lt: query.end }
            filter.action = Action.ORDERS

            if (query.groups) {
                const splitGroups = query.groups.split(',')
                filter["content.channel"] = { $in: splitGroups }
            }

            const findData = await EventsTelegramSchema.find(filter, { content: 1, action: 1 });
            const filterOpen = findData.filter((element) => element.content!.status == ContentStatus.OPEN)
            const filterNotOpen = findData.filter((element) => element.content!.status !== ContentStatus.OPEN)
            let stop = 0
            let close = 0
            filterOpen.forEach(elementOpen => {
                filterNotOpen.forEach(elementNotOpen => {
                    if (elementOpen.content!.uniqueId == elementNotOpen.content!.uniqueId) {
                        if (elementNotOpen.content!.status == ContentStatus.STOP) {
                            stop += 1
                        }
                        if (elementNotOpen.content!.status == ContentStatus.CLOSE) {
                            close += 1
                        }
                    }
                });
            })

            const activeTrade = filterOpen.length - (stop+close)
            const response: MetricsTelegramSumsResponse = {
                periodTrade: filterOpen.length,
                activeTrade: activeTrade,
                gains: close,
                losses: stop,
                finishedTrades: stop+close
            }

            return new ApplicationResponse<any>(200, response,'Success count data');

        } catch (e) {
            if (e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to get sumMetrics')
        }



    }

    static async getChannelBalances(instance: string, query: { start: number, end: number }) {
        try {

            if (!query.start || !query.end) {
                throw new ApplicationResponse(400, {}, 'Error to get balances start and end is required')
            }
            const filter = { instance } as any;
            filter.timestamp = { $gte: query.start, $lt: query.end }
            filter.action = Action.ORDERS

            const findData = await EventsTelegramSchema.find(filter, { content: 1, timestamp: 1, action: 1 });

            const responseToObject = {}
            findData.forEach(element => {
                if (element.content!.status == ContentStatus.OPEN) {
                    if (!responseToObject[element.content!.channel!]) {
                        responseToObject[element.content!.channel!] = []
                        responseToObject[element.content!.channel!].push([element.timestamp, element.content!.BTCSellQty! * -1])
                    } else {
                        responseToObject[element.content!.channel!].push([element.timestamp, element.content!.BTCSellQty! * -1])
                    }
                }
                else if (element.content!.status == ContentStatus.CLOSE || element.content!.status == ContentStatus.STOP) {
                    if (!responseToObject[element.content!.channel!]) {
                        responseToObject[element.content!.channel!] = []
                        responseToObject[element.content!.channel!].push([element.timestamp, element.content!.BTCBuyQty])

                    } else {
                        responseToObject[element.content!.channel!].push([element.timestamp, element.content!.BTCBuyQty])
                    }
                }
            });

            const responseToArray: Array<MetricsTelegramChannelBalancesResponse> = []

            const keys = Object.keys(responseToObject)

            keys.forEach(element => {
                responseToArray.push({ name: element, data: responseToObject[element] })
            });

            return new ApplicationResponse<any>(200, responseToArray);
        } catch (e) {
            if (e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to get sumMetrics')
        }
    }


}
