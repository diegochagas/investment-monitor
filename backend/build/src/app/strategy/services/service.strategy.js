"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var populate_1 = require("../../../shared/helpers/populate");
var system_errors_1 = require("../../../shared/helpers/system-errors");
var StrategyStatus_1 = require("../models/strategy/enums/StrategyStatus");
var Instance_1 = require("../../commons/models/instance/Instance");
var projectName_1 = require("../../../shared/models/enum/projectName");
var ServiceStrategy = /** @class */ (function () {
    function ServiceStrategy(type, model) {
        this.type = type;
        this.model = model;
    }
    ServiceStrategy.prototype.getHeaders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                try {
                    response = new this.type().getHeaders();
                    return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                }
                catch (e) {
                    if (e instanceof ApplicationResponse_1.ApplicationResponse) {
                        return [2 /*return*/, e];
                    }
                    throw new ApplicationResponse_1.ApplicationResponse(400, e, e.message);
                }
                return [2 /*return*/];
            });
        });
    };
    ServiceStrategy.prototype.createStrategy = function (data, locals) {
        return __awaiter(this, void 0, void 0, function () {
            var strategy, md5, findMd5, strategiesFound, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        strategy = populate_1.populate(this.type, data);
                        return [4 /*yield*/, strategy.assembleMockedValues(locals)];
                    case 1:
                        _a.sent();
                        md5 = require('md5')(JSON.stringify(strategy.config));
                        return [4 /*yield*/, this.model.find({ md5: md5 })];
                    case 2:
                        findMd5 = _a.sent();
                        if (findMd5.length > 0) {
                            return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(400, findMd5[0], system_errors_1.SystemErrors.STRATEGY_DUPLICATE_CONFIG.message, system_errors_1.SystemErrors.STRATEGY_DUPLICATE_CONFIG.code)];
                        }
                        // setting version
                        strategy.config.strategy = { name: strategy.name, version: 1 };
                        strategy.version = 1;
                        return [4 /*yield*/, this.model.find({ name: strategy.name })];
                    case 3:
                        strategiesFound = _a.sent();
                        if (strategiesFound.length > 0) {
                            strategy.config.strategy.version = strategiesFound.length + 1;
                            strategy.version = strategiesFound.length + 1;
                        }
                        return [4 /*yield*/, new this.model(strategy).save()];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                    case 5:
                        e_1 = _a.sent();
                        if (e_1 instanceof ApplicationResponse_1.ApplicationResponse) {
                            return [2 /*return*/, e_1];
                        }
                        throw new ApplicationResponse_1.ApplicationResponse(400, e_1, e_1.message);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param {string} status
     * @param {string} fields
     */
    ServiceStrategy.prototype.getStrategies = function (status, strategyType, fields) {
        if (status === void 0) { status = StrategyStatus_1.StrategyStatus.ACTIVE; }
        return __awaiter(this, void 0, void 0, function () {
            var filter, strategies, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        filter = {};
                        if (fields) {
                            filter = fields.split(',').map(function (field) {
                                var _a;
                                return (_a = {}, _a[field] = 1, _a);
                            }).reduce(function (total, current) { return (__assign({}, total, current)); });
                        }
                        return [4 /*yield*/, this.model.find({ status: status, strategyType: projectName_1.HeaderProject[strategyType] }, filter, { sort: { presentationName: 1 } })];
                    case 1:
                        strategies = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, strategies)];
                    case 2:
                        err_1 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get Strategies');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceStrategy.prototype.getStrategiesById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var strategy, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findById(id).exec()];
                    case 1:
                        strategy = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, strategy)];
                    case 2:
                        err_2 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get Strategy');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceStrategy.prototype.deleteStrategy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, {}, 'Delete complete')];
                    case 2:
                        err_3 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to delete Strategy');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceStrategy.prototype.disableStrategy = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedBy, instance, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        updatedBy = user ? user.uid : "";
                        return [4 /*yield*/, Instance_1.InstanceSchema.find({ strategy: id })];
                    case 1:
                        instance = _a.sent();
                        if (instance.length > 0) {
                            return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(400, instance[0], system_errors_1.SystemErrors.STRATEGY_USED_STRATEGY.message, system_errors_1.SystemErrors.STRATEGY_USED_STRATEGY.code)];
                        }
                        return [4 /*yield*/, this.model.updateOne({ _id: id }, { status: StrategyStatus_1.StrategyStatus.INACTIVE, updatedBy: updatedBy })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, {}, 'Strategy disabled')];
                    case 3:
                        err_4 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'unable to disable strategy');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceStrategy.prototype.enableStrategy = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedBy, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        updatedBy = user ? user.uid : "";
                        return [4 /*yield*/, this.model.updateOne({ _id: id }, { status: StrategyStatus_1.StrategyStatus.ACTIVE, updatedBy: updatedBy })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, {}, 'Strategy enabled')];
                    case 2:
                        err_5 = _a.sent();
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'unable to enable strategy');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceStrategy;
}());
exports.ServiceStrategy = ServiceStrategy;
//# sourceMappingURL=service.strategy.js.map