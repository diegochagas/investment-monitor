import {ServiceStrategy} from "../../../src/app/strategy/services/service.strategy";
import {Typegoose} from "typegoose";
import {
    MarketMakerStrategy,
    StrategyMarketMakerSchema
} from "../../../src/app/strategy/models/strategy/MarketMakerStrategy";
import {ExchangeSchema} from "../../../src/app/commons/models/exchange/Exchange";
import {StrategyStatus} from "../../../src/app/strategy/models/strategy/enums/StrategyStatus";
import {InstanceSchema} from "../../../src/app/commons/models/instance/Instance";

jest.mock('../../../src/app/strategy/db/db');
jest.mock('../../../src/app/commons/db/db');
jest.mock('../../../src/shared/middlewares/winston');
const serviceMarketMakerStrategy = new ServiceStrategy<MarketMakerStrategy, Typegoose>(MarketMakerStrategy , StrategyMarketMakerSchema);

describe('Test Strategy Service', function () {
    describe('>> CREATE <<', () => {

        test('#MOCK should return error when model is wrong', async done => {
            const strategy = {
                "name": 3,
                "config": {
                    "exchange": "{% response 'body', 'req_f0aafce765d2461899cbdc40966ba05e', 'b64::JC5kYXRhWzBdLl9pZA==::46b', 'never' %}",
                    "currencyPair": "btcusd",
                    "engine": [
                        "BALANCE",
                        "EXPOSITION",
                        "DELTA_P",
                        "EXPOSITION_SPREAD",
                        "PREX"
                    ],
                    "order": {
                        "stepSize": 6,
                        "minSpread": 0.05,
                        "maxSpread": 0.1,
                        "maxOrders": 4,
                        "wallet": 1000,
                        "orderSize": 0.3,
                        "amountOrders": 100,
                        "ordersInterval": 0.05,
                        "orderSizeAsk": 0.04,
                        "orderSizeBid": 0.05,
                        "spreadAsk": 0.04,
                        "spreadBid": 0.05,
                        "stepSizeAsk": 0.04,
                        "stepSizeBid": 0.05,
                        "fractionOrder": {
                            "fractionPercent": 0.25,
                            "fractionQuantity": 4
                        },
                        "midPriceType": "LAST_PRICE",
                        "percentUpdate": {
                            "ask": 0,
                            "bid": 0
                        }
                    }
                },
                "stopLoss": 5,
                "finPair": "btc",
                "iniPair": "usd",
                "midPrice": 10,
                "wallet": 11
            } as any;
            const response = await serviceMarketMakerStrategy.createStrategy(strategy, {});
            expect(response.statusCode).toBe(422);
            done()
        })

        describe('mock sucess', function () {
            test('#MOCK should create Strategy', async (done) => {
                const strategy = {
                    "name": "Teste",
                    "finPair": "BTC",
                    "iniPair": "USD",
                    "config": {
                        "exchange": "5cefc63b83fb1d44603d0b0e",
                        "currencyPair": "BTCUSD",
                        "engine": [
                            "BALANCE",
                            "EXPOSITION",
                            "DELTA_P",
                            "EXPOSITION_SPREAD",
                            "PREX"
                        ],
                        "order": {
                            "stepSize": 0.04,
                            "maxSpread": 0,
                            "maxOrders": 4,
                            "orderSize": 0.04,
                            "initialMidPriceType": "INSIDE",
                            "amountOrders": 1,
                            "defaultSpread": 10,
                            "ordersInterval": 0.04,
                            "orderSizeAsk": 0.04,
                            "orderSizeBid": 0.05,
                            "spreadAsk": 0.04,
                            "spreadBid": 0.05,
                            "stepSizeAsk": 0.04,
                            "stepSizeBid": 0.05,
                            amountOrdersAsk: 0,
                            amountOrdersBid: 0,
                            maxOrdersAsk: 0,
                            maxOrdersBid: 0,
                            ordersIntervalAsk: 0,
                            ordersIntervalBid: 0,
                            "fractionOrder": {
                                "fractionPercent": 0.04,
                                "fractionQuantity": 4
                            },
                            "midPriceType": "LAST_PRICE",
                            "percentUpdate": {
                                "ask": 0,
                                "bid": 0
                            }
                        },
                        "cryptoMarketPrice": {
                            "exchangesInside": [
                                "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                                "COINAPI_BRAZILIEX_TICKER_BTC_BRL"
                            ],
                            "exchangesOutside": [
                                "COINAPI_BITFINEX_TICKER_BTC_USD",
                                "COINAPI_BITSTAMP_TICKER_BTC_USD"
                            ],
                            "forexEnable": false
                        },
                        "forexMarketPrice": {
                            "subscribe": "BLOOMBERG_FOREX_CURRENCY_USD_ALL",
                            "currencyBase": "BTC",
                            "currencyQuote": "USD"
                        },
                        "referencePrice": {
                            "prexBand": 2,
                            "externalPercent": 100,
                            "internalPercent": 0,
                            "forexEnable": false
                        },
                        "global": {
                            "statusInterval": 60000,
                            "dataReloadInterval": 10000
                        },
                        "exposition": {
                            "expLimit": 2,
                            "expLimitStep": 0.5,
                            "expSpread": 0.5,
                            "sizeMultiply": 0.1
                        },
                        "stopLoss": 5
                    }
                } as any;

                jest.spyOn(StrategyMarketMakerSchema.prototype, 'save')
                    .mockImplementation(() => Promise.resolve(strategy));

                const response = await serviceMarketMakerStrategy.createStrategy(strategy, {});
                expect(response.statusCode).toBe(200);
                done()
            });
            beforeEach(() => {
                mockExchange();
                mockEmptyStrategy();
            })
        });

        describe('mock empty exchange', () => {
            beforeEach(() => {
                mockEmptyExchange()
            });

            test('#MOCK should return error when exchange does not exist', async done => {
                const strategy = {
                    "name": "Test Exchange not found",
                    "finPair": "BTC",
                    "iniPair": "USD",
                    "config": {
                        "exchange": "5cefc63b83fb1d44603d0b0e",
                        "currencyPair": "btcusd",
                        "engine": [
                            "BALANCE",
                            "EXPOSITION",
                            "DELTA_P",
                            "EXPOSITION_SPREAD",
                            "PREX"
                        ],
                        "global": {
                            "statusInterval": 60000,
                            "dataReloadInterval": 10000
                        },
                        "order": {
                            "stepSize": 0.04,
                            "maxSpread": 0,
                            "maxOrders": 4,
                            "orderSize": 0.04,
                            "initialMidPriceType": "INSIDE",
                            "amountOrders": 1,
                            "defaultSpread": 10,
                            "ordersInterval": 0.04,
                            "orderSizeAsk": 0.04,
                            "orderSizeBid": 0.05,
                            "spreadAsk": 0.04,
                            "spreadBid": 0.05,
                            "stepSizeAsk": 0.04,
                            "stepSizeBid": 0.05,
                            amountOrdersAsk: 0,
                            amountOrdersBid: 0,
                            maxOrdersAsk: 0,
                            maxOrdersBid: 0,
                            ordersIntervalAsk: 0,
                            ordersIntervalBid: 0,
                            "fractionOrder": {
                                "fractionPercent": 0.04,
                                "fractionQuantity": 4
                            },
                            "midPriceType": "LAST_PRICE",
                            "percentUpdate": {
                                "ask": 0,
                                "bid": 0
                            }
                        },
                        "exposition": {
                            "expLimit": 2,
                            "expLimitStep": 0.5,
                            "expSpread": 0.5,
                            "sizeMultiply": 0.1
                        },
                        "stopLoss": 5
                    }
                } as any;

                jest.spyOn(StrategyMarketMakerSchema.prototype, 'save')
                    .mockImplementation(() => Promise.resolve(strategy));

                const response = await serviceMarketMakerStrategy.createStrategy(strategy, {});
                expect(response.statusCode).toBe(400);
                expect(response.internalCode).toBe('10003');
                expect(response.message).toBe('Exchange não encontrada');
                done()
            })
        });

        describe('mock strategy exist', () => {
            beforeEach(() => {
                mockStrategy();
                mockExchange();
            })
            test('#MOCK should return error when duplicate config', async done => {
                const strategy = {
                    "name": "Kompler",
                    "finPair": "BTC",
                    "iniPair": "USD",
                    "config": {
                        "exchange" : "5cefc63b83fb1d44603d0b0e",
                        "exchangeOptions" : {
                            "maxConcurrentRequests" : 1000,
                            "minTimeBetweenRequests" : 3
                        },
                        "walletId" : "Kompler",
                        "currencyPair" : "BTCUSD",
                        "engine": [
                            "BALANCE",
                            "EXPOSITION",
                            "DELTA_P",
                            "EXPOSITION_SPREAD",
                            "PREX"
                        ],
                        "kafka" : null,
                        "cryptoMarketPrice" : {
                            "exchangesInside" : [
                                "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                                "COINAPI_BRAZILIEX_TICKER_BTC_BRL"
                            ],
                            "exchangesOutside" : [
                                "COINAPI_BITFINEX_TICKER_BTC_USD",
                                "COINAPI_BITSTAMP_TICKER_BTC_USD"
                            ],
                            "forexEnable" : false
                        },
                        "referencePrice" : {
                            "prexBand" : 2,
                            "externalPercent" : 100,
                            "internalPercent" : 0,
                            "forexEnable" : false
                        },
                        "forexMarketPrice" : {
                            "subscribe" : "BLOOMBERG_FOREX_CURRENCY_USD_ALL",
                            "currencyBase" : "BTC",
                            "currencyQuote" : "USD"
                        },
                        "global" : {
                            "loopInterval" : null,
                            "loopType" : null,
                            "statusInterval" : 60000,
                            "dataReloadInterval" : 10000
                        },
                        "order" : {
                            "execType" : "SPREAD",
                            "initialMidPriceType" : "INSIDE",
                            "amountOrders" : 1,
                            "defaultSpread" : 10,
                            "orderSize" : 0.04,
                            "stepSize" : 0.04,
                            "ordersInterval" : 0.04,
                            "orderSizeAsk": 0.04,
                            "orderSizeBid": 0.05,
                            "spreadAsk": 0.04,
                            "spreadBid": 0.05,
                            "stepSizeAsk": 0.04,
                            "stepSizeBid": 0.05,
                            amountOrdersAsk: 0,
                            amountOrdersBid: 0,
                            maxOrdersAsk: 0,
                            maxOrdersBid: 0,
                            ordersIntervalAsk: 0,
                            ordersIntervalBid: 0,
                            "maxOrders" : 4,
                            "midPriceType" : "LAST_PRICE",
                            "fractionOrder" : {
                                "fractionPercent" : 0.04,
                                "fractionQuantity" : 4
                            },
                            "percentUpdate" : {
                                "bid" : 0,
                                "ask" : 0
                            }
                        },
                        "exposition" : {
                            "expLimit" : 2,
                            "expLimitStep" : 0.5,
                            "expSpread" : 0.5,
                            "sizeMultiply" : 0.1
                        },
                        "stopLoss" : 5,
                        "strategy" : {
                            "name" : "Kompler",
                            "version" : 3
                        }
                    }
                } as any;

                jest.spyOn(StrategyMarketMakerSchema.prototype, 'save')
                    .mockImplementation(() => Promise.resolve(strategy));

                const response = await serviceMarketMakerStrategy.createStrategy(strategy, {});
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
                        "config": {
                            "exchange": "5cefc63b83fb1d44603d0b0e",
                            "currencyPair": "btcusd",
                            "engine": [
                                "BALANCE",
                                "EXPOSITION",
                                "DELTA_P",
                                "EXPOSITION_SPREAD",
                                "PREX"
                            ],
                            "order": {
                                "stepSize": 4,
                                "minSpread": 0.05,
                                "maxSpread": 0.1,
                                "maxOrders": 4,
                                "wallet": 1000,
                                "orderSize": 0.3,
                                "amountOrders": 100,
                                "ordersInterval": 0.05,
                                "orderSizeAsk": 0.04,
                                "orderSizeBid": 0.05,
                                "spreadAsk": 0.04,
                                "spreadBid": 0.05,
                                "stepSizeAsk": 0.04,
                                "stepSizeBid": 0.05,
                                amountOrdersAsk: 0,
                                amountOrdersBid: 0,
                                maxOrdersAsk: 0,
                                maxOrdersBid: 0,
                                ordersIntervalAsk: 0,
                                ordersIntervalBid: 0,
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
                    await serviceMarketMakerStrategy.createStrategy(strategy, {})
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
                "config" : {
                    "exchange" : "5ce6a8ccaf937907598814a5",
                    "order" : {
                        "execType" : "SPREAD",
                        "amountOrders" : 100,
                        "orderSize" : 0.3,
                        "stepSize" : 4,
                        "ordersInterval" : 0.05,
                        "orderSizeAsk": 0.04,
                        "orderSizeBid": 0.05,
                        "spreadAsk": 0.04,
                        "spreadBid": 0.05,
                        "stepSizeAsk": 0.04,
                        "stepSizeBid": 0.05,
                        "minSpread" : 0.05,
                        "maxSpread" : 0.1,
                        "maxOrders" : 4,
                        "midPriceType" : "LAST_PRICE",
                        "fractionOrder" : {
                            "fractionPercent" : 0.25,
                            "fractionQuantity" : 4
                        },
                        "percentUpdate" : {
                            "bid" : null,
                            "ask" : null
                        }
                    },
                    "exchangeOptions" : {
                        "maxConcurrentRequests" : null,
                        "minTimeBetweenRequests" : null
                    },
                    "currencyPair" : "btcusd",
                    "engine": [
                        "BALANCE",
                        "EXPOSITION",
                        "DELTA_P",
                        "EXPOSITION_SPREAD",
                        "PREX"
                    ],
                    "global" : {
                        "loopInterval" : 1000,
                        "loopType" : "STREAM"
                    },
                    "stopLoss" : 5,
                    "walletId" : "TESTEIIII",
                    "strategy" : {
                        "name" : "TESTEIIII",
                        "version" : 1
                    }
                },
                "createdAt" : "2019-07-01T16:57:57.865Z",
                "updatedAt" : "2019-07-01T16:57:57.865Z",
                "md5" : "4032356578a243d8661b4436a197035f",
                "presentationName" : "TESTEIIII-v.1",
                "__v" : 0
            };

            const mock = Promise.resolve([strategy]);

            const mockStrategyMarketMakerSchema = jest.fn();
            mockStrategyMarketMakerSchema.mockReturnValue(mock);
            StrategyMarketMakerSchema.find = mockStrategyMarketMakerSchema.bind(StrategyMarketMakerSchema);

            const response = await serviceMarketMakerStrategy.getStrategies(StrategyStatus.ACTIVE, 'MARKET_MAKER');
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
                "config" : {
                    "exchange" : "5ce6a8ccaf937907598814a5",
                    "order" : {
                        "execType" : "SPREAD",
                        "amountOrders" : 100,
                        "orderSize" : 0.3,
                        "stepSize" : 4,
                        "ordersInterval" : 0.05,
                        "orderSizeAsk": 0.04,
                        "orderSizeBid": 0.05,
                        "spreadAsk": 0.04,
                        "spreadBid": 0.05,
                        "stepSizeAsk": 0.04,
                        "stepSizeBid": 0.05,
                        "minSpread" : 0.05,
                        "maxSpread" : 0.1,
                        "maxOrders" : 4,
                        "midPriceType" : "LAST_PRICE",
                        "fractionOrder" : {
                            "fractionPercent" : 0.25,
                            "fractionQuantity" : 4
                        },
                        "percentUpdate" : {
                            "bid" : null,
                            "ask" : null
                        }
                    },
                    "exchangeOptions" : {
                        "maxConcurrentRequests" : null,
                        "minTimeBetweenRequests" : null
                    },
                    "currencyPair" : "btcusd",
                    "engine": [
                        "BALANCE",
                        "EXPOSITION",
                        "DELTA_P",
                        "EXPOSITION_SPREAD",
                        "PREX"
                    ],
                    "global" : {
                        "loopInterval" : 1000,
                        "loopType" : "STREAM"
                    },
                    "stopLoss" : 5,
                    "walletId" : "TESTEIIII",
                    "strategy" : {
                        "name" : "TESTEIIII",
                        "version" : 1
                    }
                },
                "createdAt" : "2019-07-01T16:57:57.865Z",
                "updatedAt" : "2019-07-01T16:57:57.865Z",
                "md5" : "4032356578a243d8661b4436a197035f",
                "presentationName" : "TESTEIIII-v.1",
                "__v" : 0
            };
            const mockStrategy =  Promise.resolve([strategy]);
            const mockStrategyMarketMakerSchema = jest.fn();
            mockStrategyMarketMakerSchema.mockReturnValue(mockStrategy);
            StrategyMarketMakerSchema.find = mockStrategyMarketMakerSchema.bind(StrategyMarketMakerSchema);


            const response = await serviceMarketMakerStrategy.getStrategies(StrategyStatus.ACTIVE, 'MARKET_MAKER');
            (response.data as any[]).forEach(res => {
                expect(res.instance).toBeDefined();
            });
            done()
        });

        test('#MOCK should throw error when get Strategies', async done => {

            const mock = {
                exec: () => Promise.reject()
            };

            const mockStrategyMarketMakerSchema = jest.fn();
            mockStrategyMarketMakerSchema.mockReturnValue(mock);
            StrategyMarketMakerSchema.find = mockStrategyMarketMakerSchema.bind(StrategyMarketMakerSchema);

            try {
                await serviceMarketMakerStrategy.getStrategies(StrategyStatus.ACTIVE, 'MARKET_MAKER');
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
                "createdBy" : "API",
                "status" : "active",
                "updatedBy" : "",
                "config" : {
                    "exchange" : "5ce6a8ccaf937907598814a5",
                    "order" : {
                        "execType" : "SPREAD",
                        "amountOrders" : 100,
                        "orderSize" : 0.3,
                        "stepSize" : 4,
                        "ordersInterval" : 0.05,
                        "orderSizeAsk": 0.04,
                        "orderSizeBid": 0.05,
                        "spreadAsk": 0.04,
                        "spreadBid": 0.05,
                        "stepSizeAsk": 0.04,
                        "stepSizeBid": 0.05,
                        "minSpread" : 0.05,
                        "maxSpread" : 0.1,
                        "maxOrders" : 4,
                        "midPriceType" : "LAST_PRICE",
                        "fractionOrder" : {
                            "fractionPercent" : 0.25,
                            "fractionQuantity" : 4
                        },
                        "percentUpdate" : {
                            "bid" : null,
                            "ask" : null
                        }
                    },
                    "exchangeOptions" : {
                        "maxConcurrentRequests" : null,
                        "minTimeBetweenRequests" : null
                    },
                    "currencyPair" : "btcusd",
                    "engine": [
                        "BALANCE",
                        "EXPOSITION",
                        "DELTA_P",
                        "EXPOSITION_SPREAD",
                        "PREX"
                    ],
                    "global" : {
                        "loopInterval" : 1000,
                        "loopType" : "STREAM"
                    },
                    "stopLoss" : 5,
                    "walletId" : "TESTEIIII",
                    "strategy" : {
                        "name" : "TESTEIIII",
                        "version" : 1
                    }
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

            const mockStrategyMarketMakerSchema = jest.fn();
            mockStrategyMarketMakerSchema.mockReturnValue(mock);
            StrategyMarketMakerSchema.findById = mockStrategyMarketMakerSchema.bind(StrategyMarketMakerSchema);

            const response = await serviceMarketMakerStrategy.getStrategiesById('5d1a3b9532a55134e052ff66');
            expect((response.data as any)).toBe(strategy);
            done()
        });

        test('#MOCK should throw error when get Strategy by id', async done => {
            const strategy = {
                "_id" : "5d1a3b9532a55134e052ff66",
                "name" : "TESTEIIII",
                "createdBy" : "API",
                "status" : "active",
                "updatedBy" : "",
                "config" : {
                    "exchange" : "5ce6a8ccaf937907598814a5",
                    "order" : {
                        "execType" : "SPREAD",
                        "amountOrders" : 100,
                        "orderSize" : 0.3,
                        "stepSize" : 4,
                        "ordersInterval" : 0.05,
                        "orderSizeAsk": 0.04,
                        "orderSizeBid": 0.05,
                        "spreadAsk": 0.04,
                        "spreadBid": 0.05,
                        "stepSizeAsk": 0.04,
                        "stepSizeBid": 0.05,
                        "minSpread" : 0.05,
                        "maxSpread" : 0.1,
                        "maxOrders" : 4,
                        "midPriceType" : "LAST_PRICE",
                        "fractionOrder" : {
                            "fractionPercent" : 0.25,
                            "fractionQuantity" : 4
                        },
                        "percentUpdate" : {
                            "bid" : null,
                            "ask" : null
                        }
                    },
                    "exchangeOptions" : {
                        "maxConcurrentRequests" : null,
                        "minTimeBetweenRequests" : null
                    },
                    "currencyPair" : "btcusd",
                    "engine": [
                        "BALANCE",
                        "EXPOSITION",
                        "DELTA_P",
                        "EXPOSITION_SPREAD",
                        "PREX"
                    ],
                    "global" : {
                        "loopInterval" : 1000,
                        "loopType" : "STREAM"
                    },
                    "stopLoss" : 5,
                    "walletId" : "TESTEIIII",
                    "strategy" : {
                        "name" : "TESTEIIII",
                        "version" : 1
                    }
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

            const mockStrategyMarketMakerSchema = jest.fn();
            mockStrategyMarketMakerSchema.mockReturnValue(mock);
            StrategyMarketMakerSchema.findById = mockStrategyMarketMakerSchema.bind(StrategyMarketMakerSchema);

            try {
                await serviceMarketMakerStrategy.getStrategiesById('5d1a3b9532a55134e052ff66');
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
            StrategyMarketMakerSchema.deleteOne = mockDeleteStrategy.bind(StrategyMarketMakerSchema);

            const response = await serviceMarketMakerStrategy.deleteStrategy('id');
            expect(response.statusCode).toBe(200);
            expect(response.message).toBe('Delete complete')

            done()
        });

        test('#MOCK should throw error when delete Strategy', async done => {
            const mockDeleteStrategy = jest.fn();
            mockDeleteStrategy.mockReturnValue(Promise.reject());
            StrategyMarketMakerSchema.deleteOne = mockDeleteStrategy.bind(StrategyMarketMakerSchema);

            try {
                await serviceMarketMakerStrategy.deleteStrategy('id')
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
                StrategyMarketMakerSchema.updateOne = mockStrategy.bind(StrategyMarketMakerSchema);

                const response = await serviceMarketMakerStrategy.disableStrategy('id', {});
                expect(response.statusCode).toBe(200);
                expect(response.message).toBe('Strategy disabled');

                done()
            });

            test('#MOCK should disable used Strategy', async done => {
                const mockInstance = jest.fn();
                mockInstance.mockReturnValue(Promise.resolve([1]));
                InstanceSchema.find = mockInstance.bind(InstanceSchema);

                const response = await serviceMarketMakerStrategy.disableStrategy('id', {});
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
                    await serviceMarketMakerStrategy.disableStrategy('id', {});
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
              StrategyMarketMakerSchema.updateOne = mockStrategy.bind(StrategyMarketMakerSchema);

              const response = await serviceMarketMakerStrategy.enableStrategy('', {});
              expect(response.statusCode).toBe(200);
              expect(response.message).toBe('Strategy enabled');
              done()
          });

            test('#MOCK should enable Strategy', async (done) => {
                const mockStrategy = jest.fn();
                mockStrategy.mockReturnValue(Promise.reject());
                StrategyMarketMakerSchema.updateOne = mockStrategy.bind(StrategyMarketMakerSchema);

                try {
                    await serviceMarketMakerStrategy.enableStrategy('', {});
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
                minTimeBetweenRequests: 1
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
        "config": {
            "exchange": "5cefc63b83fb1d44603d0b0e",
            "currencyPair": "btcusd",
            "engine": [
                "BALANCE",
                "EXPOSITION",
                "DELTA_P",
                "EXPOSITION_SPREAD",
                "PREX"
            ],
            "order": {
                "stepSize": 4,
                "minSpread": 0.05,
                "maxSpread": 0.1,
                "maxOrders": 4,
                "wallet": 1000,
                "orderSize": 0.3,
                "amountOrders": 100,
                "ordersInterval": 0.05,
                "orderSizeAsk": 0.04,
                "orderSizeBid": 0.05,
                "spreadAsk": 0.04,
                "spreadBid": 0.05,
                "stepSizeAsk": 0.04,
                "stepSizeBid": 0.05,
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
    StrategyMarketMakerSchema.find = mockStaticFind.bind(StrategyMarketMakerSchema);
};

const mockStrategy = () => {
    const strategy = {
        "name": "Teste Rafael agora vai 2",
        "config": {
            "exchange": "5cefc63b83fb1d44603d0b0e",
            "currencyPair": "btcusd",
            "engine": [
                "BALANCE",
                "EXPOSITION",
                "DELTA_P",
                "EXPOSITION_SPREAD",
                "PREX"
            ],
            "order": {
                "stepSize": 4,
                "minSpread": 0.05,
                "maxSpread": 0.1,
                "maxOrders": 4,
                "wallet": 1000,
                "orderSize": 0.3,
                "amountOrders": 100,
                "ordersInterval": 0.05,
                "orderSizeAsk": 0.04,
                "orderSizeBid": 0.05,
                "spreadAsk": 0.04,
                "spreadBid": 0.05,
                "stepSizeAsk": 0.04,
                "stepSizeBid": 0.05,
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
    StrategyMarketMakerSchema.find = mockStaticFind.bind(StrategyMarketMakerSchema);
};

afterAll(() => {
    jest.restoreAllMocks();
});
