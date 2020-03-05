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
var service_instance_1 = require("../services/service.instance");
var ExceptionResponse_1 = require("../../../shared/models/ExceptionResponse");
var Instance_1 = require("../models/instance/Instance");
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var factorPool_1 = require("../../../shared/util/factorPool");
exports.getInstances = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var strategyType, serviceResponse, e_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                strategyType = req.header(factorPool_1.HEADER_PROJECT_NAME);
                return [4 /*yield*/, new service_instance_1.ServiceInstance().getInstances(strategyType)];
            case 1:
                serviceResponse = _a.sent();
                res.status(serviceResponse.statusCode).json(serviceResponse);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                error = ExceptionResponse_1.ExceptionResponse.exec(e_1);
                res.status(error.statusCode).json(error);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createInstance = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(400).json(new ApplicationResponse_1.ApplicationResponse(400, '', 'Não é permitido criar uma instancia'));
        return [2 /*return*/];
    });
}); };
exports.deleteInstance = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(400).json(new ApplicationResponse_1.ApplicationResponse(400, '', 'Não é permitido excluir uma instancia'));
        return [2 /*return*/];
    });
}); };
exports.produceInstanceStrategy = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var strategyType, serviceResponse, e_2, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                strategyType = req.header(factorPool_1.HEADER_PROJECT_NAME);
                return [4 /*yield*/, new service_instance_1.ServiceInstance().produceInstanceStrategy(req.params, req.body, strategyType)];
            case 1:
                serviceResponse = _a.sent();
                res.status(serviceResponse.statusCode).json(serviceResponse);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                error = ExceptionResponse_1.ExceptionResponse.exec(e_2);
                res.status(error.statusCode).json(error);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.produceInstanceStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var serviceResponse, e_3, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, new service_instance_1.ServiceInstance().produceInstanceStatus(req.params, req.body)];
            case 1:
                serviceResponse = _a.sent();
                res.status(serviceResponse.statusCode).json(serviceResponse);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                error = ExceptionResponse_1.ExceptionResponse.exec(e_3);
                res.status(error.statusCode).json(error);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getStatusIntances = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var serviceResponse, e_4, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, new service_instance_1.ServiceInstance().produceStatusIntances()];
            case 1:
                serviceResponse = _a.sent();
                res.status(serviceResponse.statusCode).json(serviceResponse);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                error = ExceptionResponse_1.ExceptionResponse.exec(e_4);
                res.status(error.statusCode).json(error);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.upsertInstance = function (instance) {
    return new service_instance_1.ServiceInstance().upsertInstance(instance);
};
exports.refreshInstances = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var strategyType, serviceResponse, e_5, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                strategyType = req.header(factorPool_1.HEADER_PROJECT_NAME);
                return [4 /*yield*/, new service_instance_1.ServiceInstance().refreshInstances(Instance_1.InstanceType[strategyType])];
            case 1:
                serviceResponse = _a.sent();
                res.status(serviceResponse.statusCode).json(serviceResponse);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                error = ExceptionResponse_1.ExceptionResponse.exec(e_5);
                res.status(error.statusCode).json(error);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=instance.js.map