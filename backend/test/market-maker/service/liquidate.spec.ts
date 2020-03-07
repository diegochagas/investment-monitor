import {ServiceLiquidate} from "../../../src/app/market-maker/services/service.liquidate";
import {Order, OrderSchema} from "../../../src/app/market-maker/models/Order";

jest.mock('../../../src/shared/middlewares/winston');
jest.mock('../../../src/app/market-maker/db/db');
jest.mock('../../../src/infra/kafka/kafka-producer');
describe('Test Service Liquidate', () => {
    const service = new ServiceLiquidate();
    test('should return error when params is wrong', async done => {
        try {
            service.liquidExposition('NULL', 1, 'instance', {name: 'strategy', version: 1});

        } catch (e) {
            expect(e.statusCode).toBe(400);
            expect(e.message).toBe('Insuficient parameters');
        }
        done()
    });

    test('should return sucess when dont find orders to liquidate', async done => {
        const mock = {
            sort : () => Promise.resolve([])
        };
        const mockOrder = jest.fn();
        mockOrder.mockReturnValue(mock);
        OrderSchema.find = mockOrder.bind(OrderSchema);
        const response = await new ServiceLiquidate().liquidExposition('BUY', 2, 'instance', {name: 'strategy', version: 1});
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual({
            amountLiquidated: 0,
            leftLiquidate: 2,
            message: `No has Orders to liquidate`
        });
        done();
    });

    test('should throw error ', async done => {
        const mock = {
            sort : () => Promise.reject({ message: 'error to find' })
        };
        const mockOrder = jest.fn();
        mockOrder.mockReturnValue(mock);
        OrderSchema.find = mockOrder.bind(OrderSchema);
        try {

        await new ServiceLiquidate().liquidExposition('BUY', 2, 'instance', {name: 'strategy', version: 1});
        }catch(e) {

            expect(e.statusCode).toBe(400);
            expect(e.message).toBe('error to find');
        }
        done();
    });

    test('should liquidate all orders because orders sum is less then value to liquidate', async done => {
        const mock = {
            sort : () => Promise.resolve([{
                "_id" : "5cdc2615a9fbf2033e5b7028",
                "strategy" : "MM1",
                "exchange" : "BITFINEX",
                "market" : "BTC_USD",
                "symbol" : "BTC",
                "currency" : "USD",
                "orderID" : "25252199081",
                "guID" : "25252199081.atlas01@bitfinex",
                "price" : 7917.1,
                "quantity" : 10.58642944,
                "fee" : 2.68e-06,
                "side" : "BUY",
                "status" : "EXECUTED",
                "timestamp" : 1557931541364.0,
                "timestampUpdate" : 1558096411877.0,
                "synchronize" : true,
                "quantitySymbol" : 1.5,
                "version" : 1.0,
                "instance" : "instance",
                "liquidateValue" : null,
            }])
        };
        const mockFind = jest.fn();
        mockFind.mockReturnValue(mock);
        OrderSchema.find = mockFind.bind(OrderSchema);

        const mockUpdate = jest.fn();
        mockUpdate.mockReturnValue(Promise.resolve());
        OrderSchema.updateMany = mockUpdate.bind(OrderSchema);

        const response = await new ServiceLiquidate().liquidExposition('BUY', 2, 'instance', {name: 'strategy', version: 1});
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual({
            amountLiquidated: 1.5,
            leftLiquidate: 0.5,
            message: "Amount orders is less then value to liquidate, all orders was liquidated"
        });
        done();
    })

    test('shoud partially to liquidate an order', async done => {
        const mock = {
            sort : () => Promise.resolve([{
                "_id" : "5cdc2615a9fbf2033e5b7028",
                "strategy" : "MM1",
                "exchange" : "BITFINEX",
                "market" : "BTC_USD",
                "symbol" : "BTC",
                "currency" : "USD",
                "orderID" : "25252199081",
                "guID" : "25252199081.atlas01@bitfinex",
                "price" : 7917.1,
                "quantity" : 10.58642944,
                "fee" : 2.68e-06,
                "side" : "BUY",
                "status" : "EXECUTED",
                "timestamp" : 1557931541364.0,
                "timestampUpdate" : 1558096411877.0,
                "synchronize" : true,
                "quantitySymbol" : 1.5,
                "version" : 1.0,
                "instance" : "instance",
                "liquidateValue" : null,
            }])
        };
        const mockFind = jest.fn();
        mockFind.mockReturnValue(mock);
        OrderSchema.find = mockFind.bind(OrderSchema);

        const mockUpdate = jest.fn();
        mockUpdate.mockReturnValue(Promise.resolve());
        OrderSchema.updateMany = mockUpdate.bind(OrderSchema);
        OrderSchema.update = mockUpdate.bind(OrderSchema);
        const response = await new ServiceLiquidate().liquidExposition('BUY', 1, 'instance', {name: 'strategy', version: 1});
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual({
            amountLiquidated: 0.5,
            leftLiquidate: 0.5,
        });
        done()
    });
    test('shoud to liquidate an order', async done => {
        const mock = {
            sort : () => Promise.resolve([{
                "_id" : "5cdc2615a9fbf2033e5b7028",
                "strategy" : "MM1",
                "exchange" : "BITFINEX",
                "market" : "BTC_USD",
                "symbol" : "BTC",
                "currency" : "USD",
                "orderID" : "25252199081",
                "guID" : "25252199081.atlas01@bitfinex",
                "price" : 7917.1,
                "quantity" : 10.58642944,
                "fee" : 2.68e-06,
                "side" : "BUY",
                "status" : "EXECUTED",
                "timestamp" : 1557931541364.0,
                "timestampUpdate" : 1558096411877.0,
                "synchronize" : true,
                "quantitySymbol" : 1,
                "version" : 1.0,
                "instance" : "instance",
                "liquidateValue" : null,
            }])
        };
        const mockFind = jest.fn();
        mockFind.mockReturnValue(mock);
        OrderSchema.find = mockFind.bind(OrderSchema);

        const mockUpdate = jest.fn();
        mockUpdate.mockReturnValue(Promise.resolve());
        OrderSchema.updateMany = mockUpdate.bind(OrderSchema);
        OrderSchema.update = mockUpdate.bind(OrderSchema);
        const response = await new ServiceLiquidate().liquidExposition('BUY', 1, 'instance', {name: 'strategy', version: 1});
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual({
            amountLiquidated: 1,
            leftLiquidate: 0,
        });
        done()
    });

    test('shoud to liquidate an order partially liquidated', async done => {
        const mock = {
            sort : () => Promise.resolve([{
                "_id" : "5cdc2615a9fbf2033e5b7028",
                "strategy" : "MM1",
                "exchange" : "BITFINEX",
                "market" : "BTC_USD",
                "symbol" : "BTC",
                "currency" : "USD",
                "orderID" : "25252199081",
                "guID" : "25252199081.atlas01@bitfinex",
                "price" : 7917.1,
                "quantity" : 10.58642944,
                "fee" : 2.68e-06,
                "side" : "BUY",
                "status" : "PARTIALLY_LIQUIDATE",
                "timestamp" : 1557931541364.0,
                "timestampUpdate" : 1558096411877.0,
                "synchronize" : true,
                "quantitySymbol" : 1.5,
                "version" : 1.0,
                "instance" : "instance",
                "liquidateValue" : 1,
            }])
        };
        const mockFind = jest.fn();
        mockFind.mockReturnValue(mock);
        OrderSchema.find = mockFind.bind(OrderSchema);

        const mockUpdate = jest.fn();
        mockUpdate.mockReturnValue(Promise.resolve());
        OrderSchema.updateMany = mockUpdate.bind(OrderSchema);
        OrderSchema.update = mockUpdate.bind(OrderSchema);
        const response = await new ServiceLiquidate().liquidExposition('BUY', 1, 'instance', {name: 'strategy', version: 1});
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual({
            amountLiquidated: 1,
            leftLiquidate: 0,
        });
        done()
    });

});
