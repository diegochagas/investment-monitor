import {ServiceStrategy} from "../../../src/app/strategy/services/service.strategy";
import {GarchStrategy, StrategyGarchSchema} from "../../../src/app/strategy/models/strategy/GarchStrategy";
import {Typegoose} from "typegoose";
import {StrategyStatus} from "../../../src/app/strategy/models/strategy/enums/StrategyStatus";
import {InstanceSchema} from "../../../src/app/commons/models/instance/Instance";
import {ExchangeSchema} from "../../../src/app/commons/models/exchange/Exchange";

jest.mock('../../../src/app/strategy/db/db');
jest.mock('../../../src/app/commons/db/db');
jest.mock('../../../src/shared/middlewares/winston');
const serviceGarch = new ServiceStrategy<GarchStrategy, Typegoose>(GarchStrategy , StrategyGarchSchema);

describe('Test GARCH Strategy Service', function () {
    describe('>> CREATE <<', () => {

        test('#MOCK should return error when model is wrong', async done => {
            const strategy = {
                "name": 'strategy-name',
                "finPair": "USD",
                "iniPair": "BTC",
                "config": {
                    "candleTime": "1",
                    "usd": 15,
                    "tradeWindow": "4MIN",
                    "limitTrade": 1,
                    "orderType": "MARKET",
                    "expose": 50,
                    "fee": 0.002,
                    "stop": 0.02,
                    "maxCandlesBeforeCancel": 2,
                },

            } as any;
            const response = await serviceGarch.createStrategy(strategy, {});
            expect(response.statusCode).toBe(422);
            done()
        })

        describe('mock sucess', function () {
            test('#MOCK should create GarchStrategy', async (done) => {
                const strategy = {
                    "name": "Teste",
                    "finPair": "USD",
                    "iniPair": "BTC",
                    "config": {
                        "exchange": "abc",
                        "candleTime": 1,
                        "usd": 15,
                        "tradeWindow": "4MIN",
                        "limitTrade": 1,
                        "orderType": "MARKET",
                        "expose": 50,
                        "fee": 0.002,
                        "stop": 0.02,
                        "maxCandlesBeforeCancel": 2,
                        "takeProfit":54,
                        "idleMinutesAfterStop":12,
                        "stopLimit":12,
                        "stopLimitTrigger":12
                    }
                } as any;

                jest.spyOn(StrategyGarchSchema.prototype, 'save')
                    .mockImplementation(() => Promise.resolve(strategy));

                const response = await serviceGarch.createStrategy(strategy, {});
                expect(response.statusCode).toBe(200);
                done()
            });
            beforeEach(() => {
                mockExchange();
                mockEmptyStrategy();
            })
        });

        /*describe('mock empty exchange', () => {
            beforeEach(() => {
                mockEmptyExchange()
            });

            test('#MOCK should return error when exchange does not exist', async done => {
                const strategy = {
                    "name": "Test Exchange not found",

                    "config": {
                        "candleTime": 1,
                        "usd": 15,
                        "tradeWindow": "4MIN",
                        "limitTrade": 1,
                        "orderType": "MARKET",
                        "expose": 50,
                        "fee": 0.002,
                        "stop": 0.02,
                        "maxCandlesBeforeCancel": 2,
                    }
                } as any;

                jest.spyOn(StrategyGarchSchema.prototype, 'save')
                    .mockImplementation(() => Promise.resolve(strategy));

                const response = await ServiceStrategy.createStrategy(strategy, {});
                expect(response.statusCode).toBe(400);
                expect(response.internalCode).toBe('10003');
                expect(response.message).toBe('Exchange não encontrada');
                done()
            })
        });*/

        describe('mock strategy exist', () => {
            beforeEach(() => {
                mockStrategy();
                mockExchange();
            })
            test('#MOCK should return error when duplicate config', async done => {
                const strategy = {
                    "name": "Kompler",
                    "finPair": "USD",
                    "iniPair": "BTC",
                    "config": {
                        "exchange": "abc",
                        "candleTime": 1,
                        "usd": 15,
                        "tradeWindow": "4MIN",
                        "limitTrade": 1,
                        "orderType": "MARKET",
                        "expose": 50,
                        "fee": 0.002,
                        "stop": 0.02,
                        "maxCandlesBeforeCancel": 2,
                        "takeProfit":5,
                        "idleMinutesAfterStop":12,
                        "stopLimit":12,
                        "stopLimitTrigger":12
                    }
                } as any;

                jest.spyOn(StrategyGarchSchema.prototype, 'save')
                    .mockImplementation(() => Promise.resolve(strategy));

                const response = await serviceGarch.createStrategy(strategy, {});
                expect(response.statusCode).toBe(400);
                expect(response.internalCode).toBe('10000');
                expect(response.message).toBe('Já existe uma Strategy com os mesmos valores parametrizados.');
                done()
                done()
            })
        });

        describe('mock error', () => {
            beforeEach(() => {
                mockRejectExchange();
            });

            test('#MOCK should throw error when create Strategy', async done => {
                try {
                    const strategy = {
                        "name": "Teste Rafael agora vai 2",
                        "finPair": "USD",
                        "iniPair": "BTC",
                        "config": {
                            "exchange": "5cefc63b83fb1d44603d0b0e",
                            "currencyPair": "btcusd",
                            "order": {
                                "stepSize": 4,
                                "minSpread": 0.05,
                                "maxSpread": 0.1,
                                "maxOrders": 4,
                                "wallet": 1000,
                                "orderSize": 0.3,
                                "amountOrders": 100,
                                "ordersInterval": 0.05,
                                "fractionOrder": {
                                    "fractionPercent": 0.25,
                                    "fractionQuantity": 4
                                },
                                "midPriceType": "LAST_PRICE",
                                "percentUpdate": {
                                    "ask": 0,
                                    "bid": 0
                                }
                            },
                            "stopLoss": 5
                        }
                    } as any;
                    await serviceGarch.createStrategy(strategy, {})
                }catch(e) {
                    expect(e.statusCode).toBe(400);
                    expect(e.message).toBe('mock error')
                }
                done()
            })

        })





    });

    describe('>> LIST <<', () => {
        test('#MOCK should get Strategies', async done => {

            const strategy = {
                "_id" : "5d1a3b9532a55134e052ff66",
                "name" : "TESTEIIII",
                "createdBy" : "API",
                "status" : "active",
                "updatedBy" : "",
                "finPair": "USD",
                "iniPair": "BTC",
                "config" : {
                    "candleTime": 1,
                    "usd": 15,
                    "tradeWindow": "4MIN",
                    "limitTrade": 1,
                    "orderType": "MARKET",
                    "expose": 50,
                    "fee": 0.002,
                    "stop": 0.02,
                    "maxCandlesBeforeCancel": 2,
                },
                "createdAt" : "2019-07-01T16:57:57.865Z",
                "updatedAt" : "2019-07-01T16:57:57.865Z",
                "md5" : "4032356578a243d8661b4436a197035f",
                "presentationName" : "TESTEIIII-v.1",
                "__v" : 0
            };

            const mock = Promise.resolve([strategy]);

            const mockStrategyGarchSchema = jest.fn();
            mockStrategyGarchSchema.mockReturnValue(mock);
            StrategyGarchSchema.find = mockStrategyGarchSchema.bind(StrategyGarchSchema);

            const response = await serviceGarch.getStrategies(StrategyStatus.ACTIVE, 'GARCH');
            expect((response.data as any)[0]).toBe(strategy);
            done()
        });

        test('#MOCK should get used Strategies', async done => {

            const strategy = {
                "instance": "mm-node-1",
                "_id" : "5d1a3b9532a55134e052ff66",
                "name" : "TESTEIIII",
                "createdBy" : "API",
                "status" : "active",
                "updatedBy" : "",
                "finPair": "USD",
                "iniPair": "BTC",
                "config" : {
                    "candleTime": 1,
                    "usd": 15,
                    "tradeWindow": "4MIN",
                    "limitTrade": 1,
                    "orderType": "MARKET",
                    "expose": 50,
                    "fee": 0.002,
                    "stop": 0.02,
                    "maxCandlesBeforeCancel": 2,
                },
                "createdAt" : "2019-07-01T16:57:57.865Z",
                "updatedAt" : "2019-07-01T16:57:57.865Z",
                "md5" : "4032356578a243d8661b4436a197035f",
                "presentationName" : "TESTEIIII-v.1",
                "__v" : 0
            };
            const mockStrategy = Promise.resolve([strategy]);
            const mockStrategyGarchSchema = jest.fn();
            mockStrategyGarchSchema.mockReturnValue(mockStrategy);
            StrategyGarchSchema.find = mockStrategyGarchSchema.bind(StrategyGarchSchema);

            /*const instance = {
                "_id" : "5ce7fc3794aa232b488f6a78",
                "instanceId" : "I2ex",
                "strategy" : "5d1a3b9532a55134e052ff66",
                "label" : "",
                "createdAt" : "2019-05-24T14:14:15.537Z",
                "updatedAt" : "2019-06-28T12:56:00.875Z",
                "__v" : 0,
                "status" : "OFFLINE",
                "reason" : "error"
            };
            const mockInstance = Promise.resolve([instance]);
            const mockInstanceSchema = jest.fn();
            mockInstanceSchema.mockReturnValue(mockInstance);
            InstanceSchema.find = mockInstanceSchema.bind(InstanceSchema);*/


            const response = await serviceGarch.getStrategies(StrategyStatus.ACTIVE, 'GARCH');
            (response.data as any[]).forEach(res => {
                expect(res.instance).toBeDefined();
            });
            done()
        });

        test('#MOCK should throw error when get Strategies', async done => {

            const mock = Promise.reject();

            const mockStrategyGarchSchema = jest.fn();
            mockStrategyGarchSchema.mockReturnValue(mock);
            StrategyGarchSchema.find = mockStrategyGarchSchema.bind(StrategyGarchSchema);

            try {
                await serviceGarch.getStrategies(StrategyStatus.ACTIVE, 'GARCH');
            }catch (err) {
                expect(err.statusCode).toBe(400);
                expect(err.message).toBe('Error to get Strategies');
            }

            done()
        })
    });

    describe('>> GET <<', () => {
        test('#MOCK should get Strategy by id', async done => {
            const strategy = {
                "_id" : "5d1a3b9532a55134e052ff66",
                "name" : "TESTEIIII",
                "finPair": "USD",
                "iniPair": "BTC",
                "createdBy" : "API",
                "status" : "active",
                "updatedBy" : "",
                "config" : {
                    "candleTime": 1,
                    "usd": 15,
                    "tradeWindow": "4MIN",
                    "limitTrade": 1,
                    "orderType": "MARKET",
                    "expose": 50,
                    "fee": 0.002,
                    "stop": 0.02,
                    "maxCandlesBeforeCancel": 2,
                },
                "createdAt" : "2019-07-01T16:57:57.865Z",
                "updatedAt" : "2019-07-01T16:57:57.865Z",
                "md5" : "4032356578a243d8661b4436a197035f",
                "presentationName" : "TESTEIIII-v.1",
                "__v" : 0
            };

            const mock = {
                exec: () => Promise.resolve(strategy)
            };

            const mockStrategyGarchSchema = jest.fn();
            mockStrategyGarchSchema.mockReturnValue(mock);
            StrategyGarchSchema.findById = mockStrategyGarchSchema.bind(StrategyGarchSchema);

            const response = await serviceGarch.getStrategiesById('5d1a3b9532a55134e052ff66');
            expect((response.data as any)).toBe(strategy);
            done()
        });

        test('#MOCK should throw error when get Strategy by id', async done => {
            const strategy = {
                "_id" : "5d1a3b9532a55134e052ff66",
                "name" : "TESTEIIII",
                "createdBy" : "API",
                "status" : "active",
                "finPair": "USD",
                "iniPair": "BTC",
                "updatedBy" : "",
                "config" : {
                    "candleTime": 1,
                    "usd": 15,
                    "tradeWindow": "4MIN",
                    "limitTrade": 1,
                    "orderType": "MARKET",
                    "expose": 50,
                    "fee": 0.002,
                    "stop": 0.02,
                    "maxCandlesBeforeCancel": 2,
                },
                "createdAt" : "2019-07-01T16:57:57.865Z",
                "updatedAt" : "2019-07-01T16:57:57.865Z",
                "md5" : "4032356578a243d8661b4436a197035f",
                "presentationName" : "TESTEIIII-v.1",
                "__v" : 0
            };

            const mock = {
                exec: () => Promise.reject(strategy)
            };

            const mockStrategyGarchSchema = jest.fn();
            mockStrategyGarchSchema.mockReturnValue(mock);
            StrategyGarchSchema.findById = mockStrategyGarchSchema.bind(StrategyGarchSchema);

            try {
                await serviceGarch.getStrategiesById('5d1a3b9532a55134e052ff66');
            }catch(err) {
                expect(err.statusCode).toBe(400);
                expect(err.message).toBe('Error to get Strategy');
            }
            done()
        })
    })

    describe('>> DELETE <<', () => {
        test('#MOCK should delete Strategy', async done => {
            const mockDeleteStrategy = jest.fn();
            mockDeleteStrategy.mockReturnValue(Promise.resolve());
            StrategyGarchSchema.deleteOne = mockDeleteStrategy.bind(StrategyGarchSchema);

            const response = await serviceGarch.deleteStrategy('id');
            expect(response.statusCode).toBe(200);
            expect(response.message).toBe('Delete complete')

            done()
        });

        test('#MOCK should throw error when delete Strategy', async done => {
            const mockDeleteStrategy = jest.fn();
            mockDeleteStrategy.mockReturnValue(Promise.reject());
            StrategyGarchSchema.deleteOne = mockDeleteStrategy.bind(StrategyGarchSchema);

            try {
                await serviceGarch.deleteStrategy('id')
            }catch(err) {
                expect(err.statusCode).toBe(400);
                expect(err.message).toBe('Error to delete Strategy')
            }

            done()
        })
    });

    describe('>> UPDATE <<', () => {
        describe('disable', () => {
            test('#MOCK should disable Strategy', async done => {
                const mockInstance = jest.fn();
                mockInstance.mockReturnValue(Promise.resolve([]));
                InstanceSchema.find = mockInstance.bind(InstanceSchema);

                const mockStrategy = jest.fn();
                mockStrategy.mockReturnValue(Promise.resolve());
                StrategyGarchSchema.updateOne = mockStrategy.bind(StrategyGarchSchema);

                const response = await serviceGarch.disableStrategy('id', {});
                expect(response.statusCode).toBe(200);
                expect(response.message).toBe('Strategy disabled');

                done()
            });

            test('#MOCK should disable used Strategy', async done => {
                const mockInstance = jest.fn();
                mockInstance.mockReturnValue(Promise.resolve([1]));
                InstanceSchema.find = mockInstance.bind(InstanceSchema);

                const response = await serviceGarch.disableStrategy('id', {});
                expect(response.statusCode).toBe(400);
                expect(response.message).toBe('Esta Strategy está ativa em outra Instância.');
                expect(response.internalCode).toBe('10001');

                done()
            });

            test('#MOCK should throw error when disable Strategy', async done => {
                const mockInstance = jest.fn();
                mockInstance.mockReturnValue(Promise.reject([1]));
                InstanceSchema.find = mockInstance.bind(InstanceSchema);

                try {
                    await serviceGarch.disableStrategy('id', {});
                }catch(err) {
                    expect(err.statusCode).toBe(400);
                    expect(err.message).toBe('unable to disable strategy')
                }

                done()
            })
        });
        
        describe('enable', () => {
          test('#MOCK should enable Strategy', async (done) => {
              const mockStrategy = jest.fn();
              mockStrategy.mockReturnValue(Promise.resolve());
              StrategyGarchSchema.updateOne = mockStrategy.bind(StrategyGarchSchema);

              const response = await serviceGarch.enableStrategy('', {});
              expect(response.statusCode).toBe(200);
              expect(response.message).toBe('Strategy enabled');
              done()
          });

            test('#MOCK should enable Strategy', async (done) => {
                const mockStrategy = jest.fn();
                mockStrategy.mockReturnValue(Promise.reject());
                StrategyGarchSchema.updateOne = mockStrategy.bind(StrategyGarchSchema);

                try {
                    await serviceGarch.enableStrategy('', {});
                }catch(err) {
                    expect(err.statusCode).toBe(400);
                    expect(err.message).toBe('unable to enable strategy');
                }

                done()
            })
        })
    })
});


const mockRejectExchange = () => {
    const exchangeMock = {
        exec: () => Promise.reject({ message: 'mock error' })
    };

    const mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValue(exchangeMock);
    ExchangeSchema.findById = mockStaticFind.bind(ExchangeSchema);
};

const mockExchange = () => {
    const exchangeMock = {
        exec: () => {
            return Promise.resolve({
                maxConcurrentRequests: 1,
                minTimeBetweenRequests: 1,
                name: "binance"
            })
        }
    };

    const mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValue(exchangeMock);
    ExchangeSchema.findById = mockStaticFind.bind(ExchangeSchema);
};

const mockEmptyExchange = () => {
    const exchangeMock = {
        exec: () => {
            return Promise.resolve(false)
        }
    };

    const mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValue(exchangeMock);
    ExchangeSchema.findById = mockStaticFind.bind(ExchangeSchema);
}

const mockEmptyStrategy = () => {
    const strategyeMock = [];
    const strategy = {
        "name": "Teste Rafael agora vai 2",
        "finPair": "USD",
        "iniPair": "BTC",
        "config": {
            "exchange": "5cefc63b83fb1d44603d0b0e",
            "currencyPair": "btcusd",
            "order": {
                "stepSize": 4,
                "minSpread": 0.05,
                "maxSpread": 0.1,
                "maxOrders": 4,
                "wallet": 1000,
                "orderSize": 0.3,
                "amountOrders": 100,
                "ordersInterval": 0.05,
                "fractionOrder": {
                    "fractionPercent": 0.25,
                    "fractionQuantity": 4
                },
                "midPriceType": "LAST_PRICE",
                "percentUpdate": {
                    "ask": 0,
                    "bid": 0
                }
            },
            "stopLoss": 5
        }
    } as any;
    const mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValueOnce(strategyeMock).mockReturnValueOnce([strategy]);
    StrategyGarchSchema.find = mockStaticFind.bind(StrategyGarchSchema);
};

const mockStrategy = () => {
    const strategy = {
        "name": "Teste Rafael agora vai 2",
        "finPair": "USD",
        "iniPair": "BTC",
        "config": {
            "exchange": "5cefc63b83fb1d44603d0b0e",
            "currencyPair": "btcusd",
            "order": {
                "stepSize": 4,
                "minSpread": 0.05,
                "maxSpread": 0.1,
                "maxOrders": 4,
                "wallet": 1000,
                "orderSize": 0.3,
                "amountOrders": 100,
                "ordersInterval": 0.05,
                "fractionOrder": {
                    "fractionPercent": 0.25,
                    "fractionQuantity": 4
                },
                "midPriceType": "LAST_PRICE",
                "percentUpdate": {
                    "ask": 0,
                    "bid": 0
                }
            },
            "stopLoss": 5
        }
    } as any;
    const strategyeMock = [strategy];

    const mockStaticFind = jest.fn();
    mockStaticFind.mockReturnValue(strategyeMock);
    StrategyGarchSchema.find = mockStaticFind.bind(StrategyGarchSchema);
};

afterAll(() => {
    jest.restoreAllMocks();
});
