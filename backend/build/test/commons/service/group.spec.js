"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Group_1 = require("../../../src/app/commons/models/group/Group");
var service_group_1 = require("../../../src/app/commons/services/service.group");
var group = {
    "_id": "5d41e4d1c678c3580549fb2a",
    "name": "group test",
    "groupId": 1234,
    "createdAt": "2019-07-31T18:58:25.490Z",
    "updatedAt": "2019-07-31T18:58:25.490Z"
};
jest.mock('../../../src/app/commons/db/db');
describe('Test Service Group', function () {
    var _this = this;
    describe('>> CREATE <<', function () {
        var _this = this;
        test('#MOCK should create Group', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(Group_1.GroupSchema.prototype, 'save')
                            .mockImplementationOnce(function () { return group; });
                        return [4 /*yield*/, service_group_1.ServiceGroup.createGroup(group)];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data).toEqual(group);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error when model is wrong', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var wrongGroup, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wrongGroup = {};
                        jest.spyOn(Group_1.GroupSchema.prototype, 'save')
                            .mockImplementationOnce(function () { return wrongGroup; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_group_1.ServiceGroup.createGroup(wrongGroup)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1.statusCode).toBe(422);
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error to create group', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(Group_1.GroupSchema.prototype, 'save')
                            .mockImplementationOnce(function () { return Promise.reject({ message: 'mock error' }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_group_1.ServiceGroup.createGroup(group)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(e_2.statusCode).toBe(400);
                        expect(e_2.message).toBe('Error to save Group');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> LIST <<', function () {
        test('#MOCK should list group', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockGroup, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = {
                            exec: function () { return Promise.resolve([group]); }
                        };
                        mockGroup = jest.fn();
                        mockGroup.mockReturnValueOnce(mock);
                        Group_1.GroupSchema.find = mockGroup.bind(Group_1.GroupSchema);
                        return [4 /*yield*/, service_group_1.ServiceGroup.getGroup()];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data).toEqual([group]);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error when list exchange', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockGroup, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockGroup = jest.fn();
                        mockGroup.mockReturnValueOnce(Promise.reject);
                        Group_1.GroupSchema.find = mockGroup.bind(Group_1.GroupSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_group_1.ServiceGroup.getGroup()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(e_3.statusCode).toBe(400);
                        expect(e_3.message).toBe('Error to get Groups');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> GET <<', function () {
        test('#MOCK should get Group by id', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockGroupSchema, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = {
                            exec: function () { return Promise.resolve(group); }
                        };
                        mockGroupSchema = jest.fn();
                        mockGroupSchema.mockReturnValue(mock);
                        Group_1.GroupSchema.findById = mockGroupSchema.bind(Group_1.GroupSchema);
                        return [4 /*yield*/, service_group_1.ServiceGroup.getGroupById('5d41e4d1c678c3580549fb2a')];
                    case 1:
                        response = _a.sent();
                        expect(response.data).toBe(group);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> UPDATE <<', function () {
        test('#MOCK should update Exchange', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockExchange, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = Promise.resolve(group);
                        mockExchange = jest.fn();
                        mockExchange.mockReturnValueOnce(mock);
                        Group_1.GroupSchema.updateOne = mockExchange.bind(Group_1.GroupSchema);
                        return [4 /*yield*/, service_group_1.ServiceGroup.updateGroup(group._id, group)];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data).toEqual(group);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error when model to update is wrong', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var wrongGroup, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wrongGroup = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_group_1.ServiceGroup.updateGroup(group._id, wrongGroup)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        expect(e_4.statusCode).toBe(422);
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error to update exchange', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockExchange, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = Promise.reject(group);
                        mockExchange = jest.fn();
                        mockExchange.mockReturnValueOnce(mock);
                        Group_1.GroupSchema.updateOne = mockExchange.bind(Group_1.GroupSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_group_1.ServiceGroup.updateGroup('', group)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        expect(e_5.statusCode).toBe(400);
                        expect(e_5.message).toBe('Error to update Group');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> DELETE <<', function () {
        test('#MOCK should delete Exchange', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockExchange, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = {
                            exec: function () { return Promise.resolve(); }
                        };
                        mockExchange = jest.fn();
                        mockExchange.mockReturnValueOnce(mock);
                        Group_1.GroupSchema.deleteOne = mockExchange.bind(Group_1.GroupSchema);
                        return [4 /*yield*/, service_group_1.ServiceGroup.deleteGroup('')];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error to delete exchange', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mock, mockExchange, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = {
                            exec: function () { return Promise.reject(); }
                        };
                        mockExchange = jest.fn();
                        mockExchange.mockReturnValueOnce(mock);
                        Group_1.GroupSchema.deleteOne = mockExchange.bind(Group_1.GroupSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_group_1.ServiceGroup.deleteGroup('')];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        expect(e_6.statusCode).toBe(400);
                        expect(e_6.message).toBe('Error to delete Group');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=group.spec.js.map