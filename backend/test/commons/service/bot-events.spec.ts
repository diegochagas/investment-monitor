import {BotEventsSchema} from "../../../src/app/commons/models/bot-events/BotEvents";
import {ServiceBotEvents} from "../../../src/app/commons/services/service.bot-events";

jest.mock('../../../src/app/commons/db/db');
jest.mock('../../../src/shared/middlewares/winston');
describe('#Test Bot Events Service', () => {
    describe('>> LIST <<', () => {
        test('#MOCK should get Event', async (done) => {

            const mock = {

                "statusCode": 200,
                "data": {
                    "_id": "5d5d9c567ca589b6f04009e9",
                    "type": "INDICATORS_MARKET_MAKER_INVESTIMENTO.BINANCE_BTC_USD",
                    "__v": 0,
                    "createdAt": "2019-08-21T19:32:37.491Z",
                    "data": {
                        "smartSize": {
                            "deltaP": 0,
                            "deltaPPercent": 0,
                            "avgPrice": 0,
                            "exposition": {
                                "amount": {
                                    "currency": 0,
                                    "symbol": 0
                                },
                                "percent": 0,
                                "spread": 0,
                                "sizeMultiply": 0
                            }
                        },
                        "balance": {
                            "balance": {
                                "symbol": 1000000,
                                "currency": 7999999.99999999
                            },
                            "bids": {
                                "BTC": 1000000,
                                "USD": 789.9572731859856
                            },
                            "asks": {
                                "BTC": 1000000,
                                "USD": 789.956493146139
                            },
                            "average": {
                                "BTC": 1000000,
                                "USD": 789.9568831660623
                            },
                            "totalBalance": 1000789.9568831661
                        },
                        "midPrice": 0
                    },
                    "updatedAt": "2019-08-21T19:32:37.491Z"
                }
            };

            const mockStaticFind = jest.fn();
            mockStaticFind.mockReturnValue(Promise.resolve(mock));
            BotEventsSchema.findOne = mockStaticFind.bind(BotEventsSchema);

            const response = await ServiceBotEvents.getEvent('marketmaker', { type: 'INDICATOR', instance: 'investimento.binance_btc_usd' });

            expect(response.statusCode).toBe(200);
            expect(response.data.data).toEqual(mock.data);

            done();
        });

        test('#MOCK should error when get Instances', async done => {

            const mockStaticFind = jest.fn();
            mockStaticFind.mockReturnValue(Promise.reject(''));
            BotEventsSchema.findOne = mockStaticFind.bind(BotEventsSchema);

            const response = await ServiceBotEvents.getEvent('marketmaker', { type: 'INDICATOR', instance: 'investimento.binance_btc_usd' });

            expect(response.statusCode).toBe(400);
            expect(response.message).toBe('Não foi possível obter os dados.');
            done();
        })
    });
});
