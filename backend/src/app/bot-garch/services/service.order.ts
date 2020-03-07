import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {OrderGarch, OrderGarchSchema} from "../models/Order";

export class ServiceOrder {
    static async getOrders(instance: string, query: any): Promise<ApplicationResponse<OrderGarch[]>> {

        try {
            const filter = {instance} as any;
            if(query.status)
                filter['content.status'] = query.status;

            const perPage = parseInt(query.limit) || 50, page = Math.max(0, (parseInt(query.page) - 1));
            const paginate = {
                skip: (perPage * page),
                limit: perPage
            };
            const orders = await OrderGarchSchema.find(filter, {}, paginate).sort( { timestamp: query.sort ? query.sort === 'asc' ? 1 : -1 : -1 });
            return new ApplicationResponse<OrderGarch[]>(200, orders);
        }catch(e) {
            console.log(e)
            if(e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {},'Error to get Orders')
        }
    };
}
