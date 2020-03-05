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
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var Topic_1 = require("../models/topic/Topic");
var populate_1 = require("../../../shared/helpers/populate");
var handleValitateError_1 = require("../../../shared/helpers/handleValitateError");
var class_validator_1 = require("class-validator");
var ServiceTopic = /** @class */ (function () {
    function ServiceTopic() {
    }
    ServiceTopic.getTopics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Topic_1.TopicSchema.find({})];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, data)];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_1;
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get Topics');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTopic.getTopicById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var topic, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Topic_1.TopicSchema.findById(id).exec()];
                    case 1:
                        topic = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, topic)];
                    case 2:
                        e_2 = _a.sent();
                        if (e_2 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_2;
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get Topic');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTopic.createTopic = function (topic) {
        return __awaiter(this, void 0, void 0, function () {
            var model, _a, data, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        model = populate_1.populate(Topic_1.Topic, topic);
                        _a = handleValitateError_1.handleValidateError;
                        return [4 /*yield*/, class_validator_1.validate(model)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, new Topic_1.TopicSchema(model).save()];
                    case 3:
                        data = _b.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, data)];
                    case 4:
                        e_3 = _b.sent();
                        if (e_3 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_3;
                        else if (e_3.name === 'MongoError')
                            throw e_3;
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to create Topic');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTopic.updateTopic = function (_id, topic) {
        return __awaiter(this, void 0, void 0, function () {
            var model, _a, response, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        model = populate_1.populate(Topic_1.Topic, topic);
                        _a = handleValitateError_1.handleValidateError;
                        return [4 /*yield*/, class_validator_1.validate(model)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, Topic_1.TopicSchema.updateOne({ _id: _id }, model)];
                    case 3:
                        response = _b.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                    case 4:
                        e_4 = _b.sent();
                        if (e_4 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_4;
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to update Topic');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTopic.deleteTopic = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Topic_1.TopicSchema.deleteOne({ _id: _id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, {}, 'Topic deleted')];
                    case 2:
                        e_5 = _a.sent();
                        if (e_5 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_5;
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to delete Topic');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceTopic;
}());
exports.ServiceTopic = ServiceTopic;
//# sourceMappingURL=service.topic.js.map