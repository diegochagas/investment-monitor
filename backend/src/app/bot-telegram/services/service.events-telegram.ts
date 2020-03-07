import { ApplicationResponse } from "../../../shared/models/ApplicationResponse";
import { EventsTelegram, EventsTelegramSchema } from "../models/EventTelegram";

export class ServiceEventsTelegram {

    static async getEvents(instance: string, query: {
        action: string,
        limit: string,
        page: string,
        status: string
    }) {

        try {
            const filter = { instance } as any;
            if (query.action)
                filter.action = query.action;

            if (query.status)
                filter['content.status'] = query.status;

            const perPage = parseInt(query.limit) || 50, page = Math.max(0, (parseInt(query.page) - 1));
            const paginate = {
                skip: (perPage * page),
                limit: perPage
            };

            const response = await EventsTelegramSchema.find(filter, {}, paginate).sort({'timestamp':-1});


            return new ApplicationResponse<EventsTelegram[]>(200, response);

        } catch (e) {
            if (e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to get Events')
        }

    }


}
