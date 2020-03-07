import {InstanceSchema, InstanceType} from "../../../src/app/commons/models/instance/Instance";
import {ServiceInstance} from "../../../src/app/commons/services/service.instance";
jest.mock('../../../src/app/commons/db/db');
jest.mock('../../../src/app/strategy/db/db');
jest.mock('../../../src/infra/kafka/kafka-producer');
jest.mock('../../../src/infra/kafka/kafka-consumer-bot-events-queue');
jest.mock('../../../src/shared/middlewares/winston');
describe('#Test Instance Service', () => {
    describe('>> LIST <<', () => {
        test('#MOCK should get Instances', async (done) => {
            const mock = {
                exec: () => {
                    return Promise.resolve([{ _id: 'id', instanceId: 'instanceId'}, { _id: 'id', instanceId: 'instanceId'}])
                }

            };

            const mockStaticFind = jest.fn();
            mockStaticFind.mockReturnValue(mock);
            InstanceSchema.find = mockStaticFind.bind(InstanceSchema);

            const response = await new ServiceInstance().getInstances(InstanceType.MARKETMAKER);

            expect((response.data as any[]).length).toBe(2);

            done();
        });

        test('#MOCK should error when get Instances', async done => {
            const mock = {
                exec: () => {
                    return Promise.reject()
                }
            };


            const mockStaticFind = jest.fn();
            mockStaticFind.mockReturnValue(mock);
            InstanceSchema.find = mockStaticFind.bind(InstanceSchema);

            const response = await new ServiceInstance().getInstances(InstanceType.MARKETMAKER);

            expect(response.statusCode).toBe(400);
            expect(response.message).toBe('Não foi possível obter as instances.');
            done();
        })
    });
    /*describe('>> CREATE <<', () => {
        test('#MOCK should create Instance', async done => {
            const instance = {
                instanceId: 1,
                strategy: 'strategyID',
                label: 'Instance Label',
                status: InstanceStatus.OFFLINE
            } as any;

            jest.spyOn(new InstanceSchema, 'save')
                .mockImplementation(() => Promise.resolve(instance));

            const response = await new ServiceInstance().createInstance(instance);
            expect(response.statusCode).toBe(200);
            done();

        })

        test('#MOCK should error when create instance', async done => {
            const instance = {
                instanceId: 1,
                strategy: 'strategyID',
                label: 'Instance Label',
                status: InstanceStatus.OFFLINE
            } as any;

            jest.spyOn(new InstanceSchema, 'save')
                .mockImplementation(() => Promise.reject({message: 'Error mocked'}));

            const response = await new ServiceInstance().createInstance(instance);
            expect(response.statusCode).toBe(400);
            expect((response.data as any).message).toBe('Error mocked');
            done()
        })
    })*/
});
afterAll(() => {
    jest.restoreAllMocks()
});

