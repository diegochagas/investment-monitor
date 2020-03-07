import {GroupSchema, Group} from "../../../src/app/commons/models/group/Group";
import { ServiceGroup } from "../../../src/app/commons/services/service.group";

declare var Promise: any;

const group = {
    "_id" : "5d41e4d1c678c3580549fb2a",
    "name" : "group test",
    "groupId" : 1234,
    "createdAt": "2019-07-31T18:58:25.490Z",
    "updatedAt": "2019-07-31T18:58:25.490Z"
} as any;

jest.mock('../../../src/app/commons/db/db');
describe('Test Service Group', function () {
    describe('>> CREATE <<', function () {
        test('#MOCK should create Group', async done => {

            jest.spyOn(GroupSchema.prototype, 'save')
                .mockImplementationOnce(() => group);

            const response = await ServiceGroup.createGroup(group);
            expect(response.statusCode).toBe(200);
            expect(response.data).toEqual(group);

            done()
        });

        test('#MOCK should return error when model is wrong', async done => {
            const wrongGroup = {} as any;

            jest.spyOn(GroupSchema.prototype, 'save')
                .mockImplementationOnce(() => wrongGroup);

            try {
                await ServiceGroup.createGroup(wrongGroup);
            } catch (e) {
                expect(e.statusCode).toBe(422);
            }

            done()
        });

        test('#MOCK should return error to create group', async done => {
            jest.spyOn(GroupSchema.prototype, 'save')
                .mockImplementationOnce(() => Promise.reject({message: 'mock error'}));

            try {
                await ServiceGroup.createGroup(group);
            } catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe('Error to save Group')
            }
            done();
        })

    });

    describe('>> LIST <<', () => {
        test('#MOCK should list group', async done => {
            const mock = {
                exec: () => Promise.resolve([group])
            };

            const mockGroup = jest.fn();
            mockGroup.mockReturnValueOnce(mock);
            GroupSchema.find = mockGroup.bind(GroupSchema);

            const response = await ServiceGroup.getGroup();

            expect(response.statusCode).toBe(200);
            expect(response.data).toEqual([group]);

            done()
        });

        test('#MOCK should return error when list exchange', async done => {
            const mockGroup = jest.fn();
            mockGroup.mockReturnValueOnce(Promise.reject);
            GroupSchema.find = mockGroup.bind(GroupSchema);

            try {
                await ServiceGroup.getGroup();
            } catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe('Error to get Groups');
            }

            done()
        })
    });

    describe('>> GET <<', () => {
        test('#MOCK should get Group by id', async done => {
            const mock = {
                exec: () => Promise.resolve(group)
            };

            const mockGroupSchema = jest.fn();
            mockGroupSchema.mockReturnValue(mock);
            GroupSchema.findById = mockGroupSchema.bind(GroupSchema);

            const response = await ServiceGroup.getGroupById('5d41e4d1c678c3580549fb2a');
            expect((response.data as Group)).toBe(group);
            done();
        });
    });

    describe('>> UPDATE <<', () => {
        test('#MOCK should update Exchange', async done => {

            const mock = Promise.resolve(group);

            const mockExchange = jest.fn();
            mockExchange.mockReturnValueOnce(mock);
            GroupSchema.updateOne = mockExchange.bind(GroupSchema);

            const response = await ServiceGroup.updateGroup(group._id, group);

            expect(response.statusCode).toBe(200);
            expect(response.data).toEqual(group);
            done();
        });

        test('#MOCK should return error when model to update is wrong', async done => {
            const wrongGroup = {} as any;

            try {
                await ServiceGroup.updateGroup(group._id, wrongGroup);
            } catch (e) {
                expect(e.statusCode).toBe(422);
            }

            done()
        });

        test('#MOCK should return error to update exchange', async done => {

            const mock = Promise.reject(group);

            const mockExchange = jest.fn();
            mockExchange.mockReturnValueOnce(mock);
            GroupSchema.updateOne = mockExchange.bind(GroupSchema);

            try {
                await ServiceGroup.updateGroup('', group);
            } catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe('Error to update Group')
            }

            done()
        })
    });

    describe('>> DELETE <<', () => {
        test('#MOCK should delete Exchange', async done => {
            const mock = {
                exec: () => Promise.resolve()
            };

            const mockExchange = jest.fn();
            mockExchange.mockReturnValueOnce(mock);
            GroupSchema.deleteOne = mockExchange.bind(GroupSchema);

            const response = await ServiceGroup.deleteGroup('');

            expect(response.statusCode).toBe(200);

            done();
        });

        test('#MOCK should return error to delete exchange', async done => {
            const mock = {
                exec: () => Promise.reject()
            };

            const mockExchange = jest.fn();
            mockExchange.mockReturnValueOnce(mock);
            GroupSchema.deleteOne = mockExchange.bind(GroupSchema);

            try {
                await ServiceGroup.deleteGroup('');
            } catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe('Error to delete Group');
            }

            done();
        })
    })
});
