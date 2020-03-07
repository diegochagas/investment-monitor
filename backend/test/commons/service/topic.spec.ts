import {TopicSchema} from "../../../src/app/commons/models/topic/Topic";
import {ServiceTopic} from "../../../src/app/commons/services/service.topic";
import { Topic } from "../../../src/app/commons/models/topic/Topic";

jest.mock('../../../src/app/commons/db/db');

describe('Test <Subscriber> Service Topic', () => {
    describe('>> CREATE <<', function () {
        test('#MOCK should create topic', async (done) => {
            const topic = {
                "_id": "5d39da523a748f638ba43f3b",
                "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                "type": "TICKER",
                "createdAt": "2019-07-25T16:35:30.445Z",
                "updatedAt": "2019-07-25T16:35:30.445Z",
                "__v": 0
            } as any;

            jest.spyOn(TopicSchema.prototype, 'save')
                .mockImplementationOnce(() => topic);

            const response = await ServiceTopic.createTopic(topic);
            expect(response.statusCode).toBe(200);
            expect(response.data).toEqual(topic);

            done()
        });

        test('#MOCK should return error to create topic', async done => {
            jest.spyOn(TopicSchema.prototype, 'save')
                .mockImplementationOnce(() => Promise.reject({ message: 'mock error' }));

            try {
                const topic = {
                    "_id": "5d39da523a748f638ba43f3b",
                    "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                    "type": "TICKER",
                    "createdAt": "2019-07-25T16:35:30.445Z",
                    "updatedAt": "2019-07-25T16:35:30.445Z",
                    "__v": 0
                } as any;
                await ServiceTopic.createTopic(topic)
            }catch(e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe('Error to create Topic')
            }

            done()
        })
    });

    describe('>> LIST <<', () => {
        test('#MOCK should list topics', async done => {
            const topic = {
                "_id": "5d39da523a748f638ba43f3b",
                "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                "type": "TICKER",
                "createdAt": "2019-07-25T16:35:30.445Z",
                "updatedAt": "2019-07-25T16:35:30.445Z",
                "__v": 0
            } as any;

            const mockTopic = jest.fn();
            mockTopic.mockRejectedValueOnce([topic]);
            TopicSchema.find = mockTopic.bind(TopicSchema);

            try {
                const response = await ServiceTopic.getTopics();
                expect(response.statusCode).toBe(200);
                expect(response.data).toEqual([topic]);
            }catch(e) {
            }

            done()
        });

        test('#MOCK should return error to list topics', async done => {


            const mockTopic = jest.fn();
            mockTopic.mockRejectedValueOnce(Promise.reject({ message: 'mock error'}));
            TopicSchema.find = mockTopic.bind(TopicSchema);

            try {
                await ServiceTopic.getTopics();
            }catch(e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe('Error to get Topics');
            }
            done()
        })
    });

    describe('>> GET <<', () => {
        test('#MOCK should get AbstractStrategy by id', async done => {
            const topic = {
                "_id": "5d39da523a748f638ba43f3b",
                "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                "type": "TICKER",
                "createdAt": "2019-07-25T16:35:30.445Z",
                "updatedAt": "2019-07-25T16:35:30.445Z",
                "__v": 0
            } as any;

            const mock = {
                exec: () => Promise.resolve(topic)
            };

            const mockTopicSchema = jest.fn();
            mockTopicSchema.mockReturnValue(mock);
            TopicSchema.findById = mockTopicSchema.bind(TopicSchema);

            const response = await ServiceTopic.getTopicById('5d39da523a748f638ba43f3b');
            expect((response.data as Topic)).toBe(topic);
            done();
        });
    });

    describe('>> UPDATE <<', () => {
        test('#MOCK should update topic', async done => {
            const topic = {
                "_id": "5d39da523a748f638ba43f3b",
                "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                "type": "TICKER",
                "createdAt": "2019-07-25T16:35:30.445Z",
                "updatedAt": "2019-07-25T16:35:30.445Z",
                "__v": 0
            } as any;

            const mockTopic = jest.fn();
            mockTopic.mockRejectedValueOnce([topic]);
            TopicSchema.updateOne = mockTopic.bind(TopicSchema);

            try {
                const response = await ServiceTopic.updateTopic("", topic);
                expect(response.statusCode).toBe(200);
                expect(response.data).toEqual(topic);
            }catch(e) {
            }
            done()
        });

        test('#MOCK should return error to update topic', async done => {
            const topic = {
                "_id": "5d39da523a748f638ba43f3b",
                "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                "type": "TICKER",
                "createdAt": "2019-07-25T16:35:30.445Z",
                "updatedAt": "2019-07-25T16:35:30.445Z",
                "__v": 0
            } as any;

            const mockTopic = jest.fn();
            mockTopic.mockRejectedValueOnce(Promise.reject());
            TopicSchema.updateOne = mockTopic.bind(TopicSchema);

            try {
                await ServiceTopic.updateTopic("", topic);
            }catch(e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toEqual('Error to update Topic');
            }
            done()
        });
    });

    describe('>> DELETE <<', () => {
        test('#MOCK should delete topic', async done => {


            const mockTopic = jest.fn();
            mockTopic.mockRejectedValueOnce({});
            TopicSchema.updateOne = mockTopic.bind(TopicSchema);

            try {
                const response = await ServiceTopic.deleteTopic("");
                expect(response.statusCode).toBe(200);
                expect(response.message).toEqual('Topic deleted');
            }catch(e) {
            }
            done()
        });

        test('#MOCK should return error to delete topic', async done => {

            const mockTopic = jest.fn();
            mockTopic.mockRejectedValueOnce(Promise.reject());
            TopicSchema.updateOne = mockTopic.bind(TopicSchema);

            try {
                await ServiceTopic.deleteTopic("");
            }catch(e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toEqual('Error to delete Topic');
            }
            done()
        });
    })
});
