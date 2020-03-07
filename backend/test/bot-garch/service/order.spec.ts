import {OrderGarchSchema} from "../../../src/app/bot-garch/models/Order";
import {ServiceOrder} from "../../../src/app/bot-garch/services/service.order";

jest.mock('../../../src/shared/db/db-topic-persistent');
jest.mock('../../../src/shared/middlewares/winston');
describe('Test Service Order Garch', () => {
    describe('>> LIST << ', () => {

        test('#MOCK should get orders', async done => {

            const order = [
                {
                    "_id": "5d5aa8333a757e0016f0ab56",
                    "action": "ORDERS",
                    "type": "GARCH",
                    "instance": "investimento.ai.garch",
                    "content": {
                        "T": "trade",
                        "type": "BUY",
                        "trend": "S",
                        "price": 11792.1,
                        "qty": "0.012719",
                        "band": 11797.6978923598,
                        "stop": 11768.5158,
                        "lp": 11793.21,
                        "exId": 9368,
                        "status": "OPEN",
                        "priceIn": 11792.1,
                        "timeIn": 1565282146000,
                        "priceOut": 11834.39,
                        "timeOut": 1565282240000
                    },
                    "strategy": {
                        "name": "estrategia-teste",
                        "version": 2
                    }
                }
            ]

            const mock = {
                sort: () =>  Promise.resolve(order)
            };

            const mockOrder = jest.fn();
            mockOrder.mockReturnValue(mock);
            OrderGarchSchema.find = mockOrder.bind(OrderGarchSchema);

            const response = await ServiceOrder.getOrders(order[0].instance, {});

            expect(response.statusCode).toBe(200);
            expect((response.data as any[])[0]).toEqual(order[0]);

            done()
        });

        test('#MOCK should throw error when get orders', async done => {

            const mock = {
                sort : () => { return { exec: () => Promise.reject({message: 'mock error'}) } }
            };

            const mockOrder = jest.fn();
            mockOrder.mockReturnValue(mock);
            OrderGarchSchema.find = mockOrder.bind(OrderGarchSchema);

            try {
                await ServiceOrder.getOrders('', {});
            } catch (e) {
                expect(e.message).toBe('Error to get Orders')
            }

            done()
        })

    });
});

afterAll(() => {
    jest.restoreAllMocks()
});
