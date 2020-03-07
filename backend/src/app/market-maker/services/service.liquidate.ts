import {OrderSchema, OrderStatus} from "../models/Order";
import logger from "../../../shared/middlewares/winston";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {IKafkaMessage} from "../../../shared/models/interface/IKafkaMessage";
import {Project} from "../../../shared/models/enum/projectName";
import {TopicProducers} from "../../../shared/models/enum/Topic";
import {KafkaProducer} from "../../../infra/kafka/kafka-producer";
import NP from 'number-precision';

const prefix = `SERVICE_LIQUIDATE => `;
export class ServiceLiquidate {

    public async liquidExposition(side: string, valueToLiquidate: number, instance: string, strategy: { name: string, version: number }) {
        try {
            if(!((side === 'BUY' || side === 'SELL') && instance && strategy))
                throw new ApplicationResponse(400, {}, 'Insuficient parameters');

            const orders = await OrderSchema.find({ instance, strategy: strategy.name, version: strategy.version, side, $or: [{ status: OrderStatus.EXECUTED }, { status: OrderStatus.PARTIALLY_LIQUIDATE }] }).sort({ timestamp: 1 });
            if(orders.length === 0)
                return new ApplicationResponse(200, {
                    amountLiquidated: 0,
                    leftLiquidate: valueToLiquidate,
                    message: `No has Orders to liquidate`
                })

            const map = orders.map(order => order.status === OrderStatus.PARTIALLY_LIQUIDATE ? order.liquidateValue : order.quantitySymbol);
            const totalQuantitySymbols = map
                .reduce((total, current) => NP.plus((total as number ),(current as number)), 0) as number;

            logger.info(prefix + `total quantity to liquidate: ${totalQuantitySymbols}`);
            if(totalQuantitySymbols < valueToLiquidate) {
                logger.warn(prefix + `Amount orders is less then value to liquidate`);
                await OrderSchema.updateMany({ instance, strategy: strategy.name, version: strategy.version, side, $or: [{ status: OrderStatus.EXECUTED }, { status: OrderStatus.PARTIALLY_LIQUIDATE }] }, { $set: { status: OrderStatus.LIQUIDATE } });
                this.sendMessage(instance);
                return new ApplicationResponse(200, {
                    amountLiquidated: totalQuantitySymbols,
                    leftLiquidate: NP.minus(valueToLiquidate,totalQuantitySymbols),
                    message: `Amount orders is less then value to liquidate, all orders was liquidated`
                })
            } else {
                const partiallyLiquidate = orders.filter(order => order.status === OrderStatus.PARTIALLY_LIQUIDATE);
                if(partiallyLiquidate.length > 0)
                    logger.info(prefix + `quantity orders partially liquidates: ${partiallyLiquidate.length}`);

                const orderIdsToLiquidate: string[] = [];
                let sum = 0;
                let index = 0;
                while(valueToLiquidate > sum) {

                    if(orders[index].status === OrderStatus.PARTIALLY_LIQUIDATE) sum = NP.plus(sum, orders[index].liquidateValue as number);
                    else sum = NP.plus(sum, orders[index].quantitySymbol as number);
                    orderIdsToLiquidate.push(orders[index]._id);
                    index++;
                }
                const restValue = NP.minus(sum,valueToLiquidate);
                const orderIdToLiquidatePartially = orders[index -1]._id;
                const filter = orderIdsToLiquidate.map(id => ({ _id: id }));

                await OrderSchema.updateMany({ $or: filter }, { $set: { status: OrderStatus.LIQUIDATE }, $unset: { liquidateValue: "" } });
                if(restValue === 0)
                    logger.info(prefix + ` value totally liquidated `);
                else await OrderSchema.update({ _id: orderIdToLiquidatePartially }, { $set: { status: OrderStatus.LIQUIDATE }, $unset: { liquidateValue: "" } });

                this.sendMessage(instance);
                return new ApplicationResponse(200, {
                    amountLiquidated: valueToLiquidate > restValue ? NP.minus(valueToLiquidate, restValue) : valueToLiquidate,
                    leftLiquidate: restValue
                })
            }


        }catch(e) {
            if(e instanceof ApplicationResponse)
                return e;
            throw new ApplicationResponse(400, {}, e.message);
        }
    }

    private sendMessage(instance: string) {
        const msg: IKafkaMessage = {
            action: 'EXPOSITION_RELOAD',
            type: Project.MARKET_MAKER,
            instance: instance,
            content: {},
            timestamp: Date.now()
        }
        KafkaProducer.getInstance().create({
            topic: TopicProducers.BOT_MANAGER,
            messages: [ { value: JSON.stringify(msg) }]
        })

    }

}
