import { ServiceMetricTelegram } from "../../../src/app/bot-telegram/services/service.metrics-telegram"
import { EventsTelegramSchema } from '../../../src/app/bot-telegram/models/EventTelegram'
jest.mock('../../../src/shared/middlewares/winston');

describe("Test Service Metrics Sum Telegram", () => {
    describe(">> SUM <<", () => {
        test("ERROR STAR END DATE", async () => {
            try {
                const getSumError = await ServiceMetricTelegram.getSumMetrics("telegram.signal", { start: 0, end: 0, groups: "" })
                expect(getSumError.statusCode).not.toBe(200)
            } catch (error) {
                expect(error.statusCode).toBe(400)
            }
        })

        test("Find not have GROUP", async () => {
            try {
                jest.spyOn(EventsTelegramSchema, "find").mockResolvedValue([])
                const getSum = await ServiceMetricTelegram.getSumMetrics("telegram.signal", { start: 2, end: 1, groups: "" })
                expect(getSum.statusCode).toBe(200)
            } catch (error) {
                expect(error.statusCode).toBe(200)
            }
        })

        test("Find have GROUP", async () => {
            try {
                const event = new EventsTelegramSchema()
                event.content = { status: "CLOSE",uniqueId:"123" }

                const event2 = new EventsTelegramSchema()
                event2.content = { status: "OPEN",uniqueId:"123" }

                const event3 = new EventsTelegramSchema()
                event3.content = { status: "OPEN",uniqueId:"1234" }

                const event4 = new EventsTelegramSchema()
                event4.content = { status: "STOP",uniqueId:"1234" }


                const event5 = new EventsTelegramSchema()
                event5.content = { status: "OPEN",uniqueId:"12345" }


                jest.spyOn(EventsTelegramSchema, "find").mockResolvedValue([event, event2, event3, event4, event5])
                const getSum = await ServiceMetricTelegram.getSumMetrics("telegram.signal", { start: 22, end: 12, groups: "teste,novo" })
                expect(getSum.statusCode).toBe(200)
                expect(getSum.data.periodTrade).toBe(3)
                expect(getSum.data.gains).toBe(1)
                expect(getSum.data.losses).toBe(1)
                expect(getSum.data.finishedTrades).toBe(2)

            } catch (error) {
                expect(error.statusCode).toBe(200)
            }
        })

        test("Find error", async () => {
            const mockFunc = jest.fn();
            mockFunc.mockReturnValue(Promise.reject({ message: 'Error' }));
            EventsTelegramSchema.find = mockFunc.bind(EventsTelegramSchema);
            try {
                const errorGet = await ServiceMetricTelegram.getSumMetrics('telegram.signal', { start: 2, end: 1, groups: "teste,novo" })
                expect(errorGet.statusCode).not.toBe(200);

            } catch (e) {
                expect(e.statusCode).toBe(400);
            }
        })

    })

    describe("Teste Service Metrics Balances", () => {
        describe(">> BALANCES <<", () => {
            test("ERROR STAR END DATE", async () => {
                try {
                    const getSumError = await ServiceMetricTelegram.getChannelBalances("telegram.signal", { start: 0, end: 0 })
                    expect(getSumError.statusCode).not.toBe(200)
                } catch (error) {
                    expect(error.statusCode).toBe(400)
                }
            })

        })

        test("Calculate Balances", async () => {
            try {
                const event = new EventsTelegramSchema()
                event.content = { status: "CLOSE",BTCBuyQty:1.7,channel:"CQS" }
                event.timestamp= Date.now()

                const event2 = new EventsTelegramSchema()
                event2.content = { status: "OPEN",BTCSellQty:1, channel:"CQS" }
                event2.timestamp= Date.now()
                
                const event3 = new EventsTelegramSchema()
                event3.content = { status: "OPEN",BTCSellQty:1,channel:"4C" }
                event3.timestamp= Date.now()
                
                const event4 = new EventsTelegramSchema()
                event4.content = { status: "STOP",BTCSellQty:0.75,channel:"4C" }
                event4.timestamp= Date.now()

                const event5 = new EventsTelegramSchema()
                event5.content = { status: "OPEN",BTCSellQty:1,channel:"CQS" }
                event5.timestamp= Date.now()

                jest.spyOn(EventsTelegramSchema, "find").mockResolvedValue([event, event2, event3, event4, event5])
                const getBalances = await ServiceMetricTelegram.getChannelBalances("telegram.signal", { start: 2, end: 1 })
                expect(getBalances.statusCode).toBe(200)
                expect(getBalances.data.length).toBe(2)

                expect(getBalances.data[0].name).toBe("CQS")
                expect(getBalances.data[1].name).toBe("4C")
            
                expect(getBalances.data[0].data.length).toBe(3)
                expect(getBalances.data[1].data.length).toBe(2)

            } catch (error) {
                expect(error.statusCode).toBe(200)
            }
        })

        test("Find error", async () => {
            const mockFunc = jest.fn();
            mockFunc.mockReturnValue(Promise.reject({ message: 'Error' }));
            EventsTelegramSchema.find = mockFunc.bind(EventsTelegramSchema);
            try {
                const errorGet = await ServiceMetricTelegram.getChannelBalances('telegram.signal', { start: 2, end: 1})
                expect(errorGet.statusCode).not.toBe(200);

            } catch (e) {
                expect(e.statusCode).toBe(400);
            }
        })


    })


})