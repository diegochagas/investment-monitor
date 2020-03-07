/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/
import { OrderSchema, Order, OrderStatus } from "../models/Order";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {populate} from "../../../shared/helpers/populate";
import {validate} from "class-validator";
import {handleValidateError} from "../../../shared/helpers/handleValitateError";
export class ServiceOrder {
  public lastIndexBought;
  public lastIndexSold;
  constructor() {
  }
  public async getDashOrders(instance: string, query: any): Promise<ApplicationResponse<Order[]>> {
    const filter = {instance} as any;
    if(query.status)
      filter.status = query.status;

    if(query.dtIni && query.dtFim)
      filter["$and"] = [ { timestamp: { "$gte": query.dtIni } }, { timestamp: { "$lte": query.dtFim } } ];

    console.log('filter', JSON.stringify(filter));

    const perPage = parseInt(query.limit) || 50, page = Math.max(0, (parseInt(query.page) - 1));
    const paginate = {
      skip: (perPage * page),
      limit: perPage
    };
    const promiseOrders = OrderSchema.find(filter, {}, paginate).sort( { timestamp: query.sort ? query.sort === 'asc' ? 1 : -1 : -1 }).exec();
    return promiseOrders.then(orders => {
        return new ApplicationResponse<Order[]>(200, orders);
      })
      .catch( error => {
        throw error
      }); 
  };

  public async createOrder(order: Order): Promise<ApplicationResponse<Order>> {
    try {
      const model = populate(Order, order);
      await handleValidateError(await validate(model));
      const response = await new OrderSchema(model).save();
      return new ApplicationResponse(200, response);

    }catch(err) {
      if(err instanceof ApplicationResponse)
        return err;
      throw new ApplicationResponse(400, {}, 'Unable to create order');
    }
  }
}
