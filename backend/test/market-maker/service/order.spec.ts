import {OrderSchema, OrderStatus} from "../../../src/app/market-maker/models/Order";
import {ServiceOrder} from "../../../src/app/market-maker/services/service.order";
import moment = require("moment");

jest.mock('../../../src/app/market-maker/db/db');
describe('Test Service Order', () => {
    describe('>> LIST << ', () => {

        test('#MOCK should get dashboard', async done => {
            const order = [
                {
                    "_id": "5cdd6bd19f1cef01878d3bcd",
                    "strategy": "Market Maker",
                    "exchange": "BINANCE",
                    "market": "BTC_USDT",
                    "symbol": "BTC",
                    "currency": "USDT",
                    "orderID": "368232775",
                    "guID": "368232775.atlas01@binance",
                    "price": 7811.78,
                    "quantity": 20.43561648,
                    "fee": 2.62e-06,
                    "side": "BUY",
                    "status": "CANCELED",
                    "timestamp": 1558014929416.0,
                    "timestampUpdate": 1558014999300.0,
                    "synchronize": false,
                    "instance": "I2ex"
                },
                {
                    "_id": "5cdd6bd39f1cef01878d3bd1",
                    "strategy": "Market Maker",
                    "exchange": "BINANCE",
                    "market": "BTC_USDT",
                    "symbol": "BTC",
                    "currency": "USDT",
                    "orderID": "368232801",
                    "guID": "368232801.atlas01@binance",
                    "price": 7843.09,
                    "quantity": 20.49399417,
                    "fee": 0.020494,
                    "side": "SELL",
                    "status": "OPEN",
                    "timestamp": 1558014931395.0,
                    "timestampUpdate": 1558014931395.0,
                    "synchronize": false,
                    "instance": "mm-node-01"
                },
                {
                    "_id": "5cdd6bd19f1cef01878d3bce",
                    "strategy": "Market Maker",
                    "exchange": "BINANCE",
                    "market": "BTC_USDT",
                    "symbol": "BTC",
                    "currency": "USDT",
                    "orderID": "368232785",
                    "guID": "368232785.atlas01@binance",
                    "price": 7811,
                    "quantity": 21.456817,
                    "fee": 2.75e-06,
                    "side": "BUY",
                    "status": "CANCELED",
                    "timestamp": 1558014929422.0,
                    "timestampUpdate": 1558014976471.0,
                    "synchronize": false,
                    "instance": "mm-node-01"
                },
                {
                    "_id": "5cdd6bd39f1cef01878d3bd1",
                    "strategy": "Market Maker",
                    "exchange": "BINANCE",
                    "market": "BTC_USDT",
                    "symbol": "BTC",
                    "currency": "USDT",
                    "orderID": "368232801",
                    "guID": "368232801.atlas01@binance",
                    "price": 7843.09,
                    "quantity": 20.49399417,
                    "fee": 0.020494,
                    "side": "SELL",
                    "status": "OPEN",
                    "timestamp": 1558014931395.0,
                    "timestampUpdate": 1558014931395.0,
                    "synchronize": false,
                    "instance": "mm-node-01"
                },
                {
                    "_id": "5cdd6bd39f1cef01878d3bd2",
                    "strategy": "Market Maker",
                    "exchange": "BINANCE",
                    "market": "BTC_USDT",
                    "symbol": "BTC",
                    "currency": "USDT",
                    "orderID": "368232842",
                    "guID": "368232842.atlas01@binance",
                    "price": 7843.87,
                    "quantity": 21.52357928,
                    "fee": 0.02152358,
                    "side": "SELL",
                    "status": "OPEN",
                    "timestamp": 1558014931395.0,
                    "timestampUpdate": 1558014931395.0,
                    "synchronize": false,
                    "instance": "mm-node-01"
                },
                {
                    "_id": "5cdd6bdd9f1cef01878d3bd6",
                    "strategy": "Market Maker",
                    "exchange": "BINANCE",
                    "market": "BTC_USDT",
                    "symbol": "BTC",
                    "currency": "USDT",
                    "orderID": "368233023",
                    "guID": "368233023.atlas01@binance",
                    "price": 7811.8,
                    "quantity": 20.4356688,
                    "fee": 2.62e-06,
                    "side": "SELL",
                    "status": "CANCELED",
                    "timestamp": 1558014941331.0,
                    "timestampUpdate": 1558014996196.0,
                    "instance": "mm-node-01"
                },
                {
                    "_id": "5cdd6bde9f1cef01878d3bd8",
                    "strategy": "Market Maker",
                    "exchange": "BINANCE",
                    "market": "BTC_USDT",
                    "symbol": "BTC",
                    "currency": "USDT",
                    "orderID": "368233050",
                    "guID": "368233050.atlas01@binance",
                    "price": 7844.65,
                    "quantity": 20.49807044,
                    "fee": 0.02049808,
                    "side": "BUY",
                    "status": "OPEN",
                    "timestamp": 1558014942456.0,
                    "timestampUpdate": 1558014942456.0,
                    "instance": "mm-node-01"
                },
                {
                    "_id": "5cdd6be29f1cef01878d3bdb",
                    "strategy": "Market Maker",
                    "exchange": "BINANCE",
                    "market": "BTC_USDT",
                    "symbol": "BTC",
                    "currency": "USDT",
                    "orderID": "368233142",
                    "guID": "368233142.atlas01@binance",
                    "price": 7813.32,
                    "quantity": 20.43964512,
                    "fee": 2.62e-06,
                    "side": "SELL",
                    "status": "CANCELED",
                    "timestamp": 1558014945279.0,
                    "timestampUpdate": 1558015056148.0,
                    "instance": "mm-node-01"
                },];
            const dash = {
                "_id": "5cdd6bd19f1cef01878d3bcd",
                "strategy": "Market Maker",
                "exchange": "BINANCE",
                "market": "BTC_USDT",
                "symbol": "BTC",
                "currency": "USDT",
                "orderID": "368232775",
                "guID": "368232775.atlas01@binance",
                "price": 7811.78,
                "quantity": 20.43561648,
                "fee": 2.62e-06,
                "side": "BUY",
                "status": "CANCELED",
                "timestamp": 1558014929416.0,
                "timestampUpdate": 1558014999300.0,
                "synchronize": false,
                "instance": "I2ex"
            };

            const mock = {
                sort: () => { return { exec: () => Promise.resolve(order) }}
            };

            const mockOrder = jest.fn();
            mockOrder.mockReturnValue(mock);
            OrderSchema.find = mockOrder.bind(OrderSchema);

            const response = await new ServiceOrder().getDashOrders(order[0].instance, {});

            expect(response.statusCode).toBe(200);
            expect((response.data as any[])[0]).toEqual(dash);

            done()
        });

        test('#MOCK should throw error when get dashboard', async done => {

            const mock = {
                sort : () => { return { exec: () => Promise.reject({message: 'mock error'}) } }
            };

            const mockOrder = jest.fn();
            mockOrder.mockReturnValue(mock);
            OrderSchema.find = mockOrder.bind(OrderSchema);

            try {
                await new ServiceOrder().getDashOrders('', {});
            } catch (e) {
                expect(e.message).toBe('mock error')
            }

            done()
        })

    });

    describe('>> CREATE <<', () => {
        test('#MOCK should create order', async done => {
            const order = {
                "_id": "5d0931d4c6b563030c5fc73b",
                "strategy": "Market Maker",
                "exchange": "BINANCE",
                "market": "BTC_USDT",
                "symbol": "BTC",
                "currency": "USDT",
                "orderID": "368232775",
                "guID": "368232775.atlas01@binance",
                "price": 7811.78,
                "quantity": 20.43561648,
                "fee": 0.00000262,
                "side": "BUY",
                "status": "CANCELED",
                "timestamp": 1558014929416,
                "timestampUpdate": 1558014999300,
                "createdAt": "2019-06-18T18:47:48.582Z",
                quantitySymbol: 2,
                "updatedAt": "2019-06-18T18:47:48.582Z",
                "__v": 0
            } as any;

            jest.spyOn(OrderSchema.prototype, 'save')
                .mockImplementation(() => order);

            const response = await new ServiceOrder().createOrder(order);

            expect(response.statusCode).toBe(200);

            done()
        });

        test('#MOCK should throw error when model is wrong', async done => {
            const order = {
                "_id": "5d0931d4c6b563030c5fc73b",
                "strategy": "Market Maker",
                "exchange": "BINANCE",
                "market": "BTC_USDT",
                "symbol": "BTC",
                "currency": "USDT",
                "orderID": "368232775",
                "guID": "368232775.atlas01@binance",
                "price": "7811.78",
                "quantity": 20.43561648,
                "fee": 0.00000262,
                "side": "BUY",
                "status": "CANCELED",
                "timestamp": 1558014929416,
                "timestampUpdate": 1558014999300,
                quantitySymbol: 2,
                "createdAt": "2019-06-18T18:47:48.582Z",
                "updatedAt": "2019-06-18T18:47:48.582Z",
                "__v": 0
            } as any;

            jest.spyOn(new OrderSchema, 'save')
                .mockImplementation(() => order);

            const response = await new ServiceOrder().createOrder(order);
            expect(response.statusCode).toBe(422);
            expect(response.data).toEqual([{
                property: 'price',
                value: '7811.78',
                status: ['price must be a number']
            }]);

            done()
        });

        test('#MOCK should throw error when create order', async done => {

            jest.spyOn(new OrderSchema, 'save')
                .mockImplementation(() => Promise.reject());

            try {
                await new ServiceOrder().createOrder({} as any);
            } catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe('Unable to create order');
            }

            done()
        })
    })
});

afterAll(() => {
    jest.restoreAllMocks()
});
