import {EventsTelegramSchema} from "../../../src/app/bot-telegram/models/EventTelegram";
import {ServiceEventsTelegram} from "../../../src/app/bot-telegram/services/service.events-telegram";
import {ApplicationResponse} from "../../../src/shared/models/ApplicationResponse";

jest.mock('../../../src/shared/db/db-topic-persistent');
describe('Test Service Events Telegram', () => {
    describe('>> LIST <<', () => {
        test('should return Indicators items', async done => {


            const order = {
                "_id": "5d650349cd67520012ff3ba9",
                "type": "TELEGRAM",
                "action": "ORDERS",
                "instance": "telegram.signal",
                "strategy": {
                    "name": "Telegram Default2",
                    "version": 1
                },
                "timestamp": 1566901065000,
                "content": {
                    "T": "trade",
                    "typeEX": "SELL",
                    "buyMin": "0.00009851",
                    "buyMax": "0.00010019",
                    "qty": 36.74,
                    "stop": "0.00009273",
                    "targets": [
                        "0.00010614",
                        "0.00011309"
                    ],
                    "pair": "NANOBTC",
                    "step": 2,
                    "channel": "jorgetelegram2",
                    "uniqueId": "fe65342c084f45e4825fba4f7788b867",
                    "type": "C",
                    "price": 0.0000998,
                    "exId": 89428574,
                    "status": "CLOSE",
                    "priceIn": 0.0000999,
                    "timeIn": 1566840197000,
                    "qtdTagets": 3,
                    "initQty": 55.11,
                    "priceOut": 0.0001022,
                    "timeOut": 1566901065000,
                    "fee": 0
                }
            }

            
            const mock = {
                sort: () => { return Promise.resolve(order) }
            };

                        
            const mockFunc = jest.fn();
            mockFunc.mockReturnValue(mock);
            EventsTelegramSchema.find = mockFunc.bind(EventsTelegramSchema)

            const response = await ServiceEventsTelegram.getEvents('telegram.signal', {
                action: 'INDICATORS',
                limit: "50",
                page: "1",
                status: "OPEN"
            });
            
            expect(response.statusCode).toBe(200);
            expect(response.data).toEqual(order);
            done()
        });

        test('should return error when getEvents', async done => {

            const mockFunc = jest.fn();
            mockFunc.mockReturnValue( { sort: ()=> Promise.reject({message: 'Error'})} );
            EventsTelegramSchema.find = mockFunc.bind(EventsTelegramSchema);
            try {
                await ServiceEventsTelegram.getEvents('telegram.signal', {action: 'INDICATORS', limit: "50", page: "1", status: ""})
            } catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toEqual('Error to get Events');
                done()
            }
        });

        test('should return ApplicationResponse error when getEvents', async done => {

            const mockFunc = jest.fn();
            mockFunc.mockReturnValue(  { sort:()=> Promise.reject(new ApplicationResponse(400, {}, 'Error to get Events'))});
            EventsTelegramSchema.find = mockFunc.bind(EventsTelegramSchema);
            try {
                await ServiceEventsTelegram.getEvents('telegram.signal', {action: 'INDICATORS', limit: "50", page: "1", status: ""})
            } catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toEqual('Error to get Events');
                done()
            }
        })
    })
});
