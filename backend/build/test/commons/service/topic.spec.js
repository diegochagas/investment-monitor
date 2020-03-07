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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Topic_1 = require("../../../src/app/commons/models/topic/Topic");
var service_topic_1 = require("../../../src/app/commons/services/service.topic");
jest.mock('../../../src/app/commons/db/db');
describe('Test <Subscriber> Service Topic', function () {
    describe('>> CREATE <<', function () {
        var _this = this;
        test('#MOCK should create topic', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var topic, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        topic = {
                            "_id": "5d39da523a748f638ba43f3b",
                            "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                            "type": "TICKER",
                            "createdAt": "2019-07-25T16:35:30.445Z",
                            "updatedAt": "2019-07-25T16:35:30.445Z",
                            "__v": 0
                        };
                        jest.spyOn(Topic_1.TopicSchema.prototype, 'save')
                            .mockImplementationOnce(function () { return topic; });
                        return [4 /*yield*/, service_topic_1.ServiceTopic.createTopic(topic)];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data).toEqual(topic);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error to create topic', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var topic, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(Topic_1.TopicSchema.prototype, 'save')
                            .mockImplementationOnce(function () { return Promise.reject({ message: 'mock error' }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        topic = {
                            "_id": "5d39da523a748f638ba43f3b",
                            "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                            "type": "TICKER",
                            "createdAt": "2019-07-25T16:35:30.445Z",
                            "updatedAt": "2019-07-25T16:35:30.445Z",
                            "__v": 0
                        };
                        return [4 /*yield*/, service_topic_1.ServiceTopic.createTopic(topic)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1.statusCode).toBe(400);
                        expect(e_1.message).toBe('Error to create Topic');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> LIST <<', function () {
        test('#MOCK should list topics', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var topic, mockTopic, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        topic = {
                            "_id": "5d39da523a748f638ba43f3b",
                            "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                            "type": "TICKER",
                            "createdAt": "2019-07-25T16:35:30.445Z",
                            "updatedAt": "2019-07-25T16:35:30.445Z",
                            "__v": 0
                        };
                        mockTopic = jest.fn();
                        mockTopic.mockRejectedValueOnce([topic]);
                        Topic_1.TopicSchema.find = mockTopic.bind(Topic_1.TopicSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_topic_1.ServiceTopic.getTopics()];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data).toEqual([topic]);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error to list topics', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockTopic, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTopic = jest.fn();
                        mockTopic.mockRejectedValueOnce(Promise.reject({ message: 'mock error' }));
                        Topic_1.TopicSchema.find = mockTopic.bind(Topic_1.TopicSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_topic_1.ServiceTopic.getTopics()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(e_3.statusCode).toBe(400);
                        expect(e_3.message).toBe('Error to get Topics');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> GET <<', function () {
        test('#MOCK should get AbstractStrategy by id', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var topic, mock, mockTopicSchema, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        topic = {
                            "_id": "5d39da523a748f638ba43f3b",
                            "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                            "type": "TICKER",
                            "createdAt": "2019-07-25T16:35:30.445Z",
                            "updatedAt": "2019-07-25T16:35:30.445Z",
                            "__v": 0
                        };
                        mock = {
                            exec: function () { return Promise.resolve(topic); }
                        };
                        mockTopicSchema = jest.fn();
                        mockTopicSchema.mockReturnValue(mock);
                        Topic_1.TopicSchema.findById = mockTopicSchema.bind(Topic_1.TopicSchema);
                        return [4 /*yield*/, service_topic_1.ServiceTopic.getTopicById('5d39da523a748f638ba43f3b')];
                    case 1:
                        response = _a.sent();
                        expect(response.data).toBe(topic);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> UPDATE <<', function () {
        test('#MOCK should update topic', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var topic, mockTopic, response, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        topic = {
                            "_id": "5d39da523a748f638ba43f3b",
                            "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                            "type": "TICKER",
                            "createdAt": "2019-07-25T16:35:30.445Z",
                            "updatedAt": "2019-07-25T16:35:30.445Z",
                            "__v": 0
                        };
                        mockTopic = jest.fn();
                        mockTopic.mockRejectedValueOnce([topic]);
                        Topic_1.TopicSchema.updateOne = mockTopic.bind(Topic_1.TopicSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_topic_1.ServiceTopic.updateTopic("", topic)];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.data).toEqual(topic);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error to update topic', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var topic, mockTopic, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        topic = {
                            "_id": "5d39da523a748f638ba43f3b",
                            "name": "COINAPI_BRAZILIEX_TICKER_BTC_BRL",
                            "type": "TICKER",
                            "createdAt": "2019-07-25T16:35:30.445Z",
                            "updatedAt": "2019-07-25T16:35:30.445Z",
                            "__v": 0
                        };
                        mockTopic = jest.fn();
                        mockTopic.mockRejectedValueOnce(Promise.reject());
                        Topic_1.TopicSchema.updateOne = mockTopic.bind(Topic_1.TopicSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_topic_1.ServiceTopic.updateTopic("", topic)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        expect(e_5.statusCode).toBe(400);
                        expect(e_5.message).toEqual('Error to update Topic');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('>> DELETE <<', function () {
        test('#MOCK should delete topic', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockTopic, response, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTopic = jest.fn();
                        mockTopic.mockRejectedValueOnce({});
                        Topic_1.TopicSchema.updateOne = mockTopic.bind(Topic_1.TopicSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_topic_1.ServiceTopic.deleteTopic("")];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(response.message).toEqual('Topic deleted');
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('#MOCK should return error to delete topic', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var mockTopic, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTopic = jest.fn();
                        mockTopic.mockRejectedValueOnce(Promise.reject());
                        Topic_1.TopicSchema.updateOne = mockTopic.bind(Topic_1.TopicSchema);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service_topic_1.ServiceTopic.deleteTopic("")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        expect(e_7.statusCode).toBe(400);
                        expect(e_7.message).toEqual('Error to delete Topic');
                        return [3 /*break*/, 4];
                    case 4:
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=topic.spec.js.map