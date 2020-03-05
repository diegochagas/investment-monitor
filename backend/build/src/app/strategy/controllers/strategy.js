"use strict";
/*
* Copyright (C) Atlas Project LLC
* All Rights Reserved.
*
* Unauthorized copying of this file, via any medium is strictly prohibited.
*
* Proprietary and confidential.
*/
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ExceptionResponse_1 = require("../../../shared/models/ExceptionResponse");
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var factorPool_1 = require("../../../shared/util/factorPool");
var projectName_1 = require("../../../shared/models/enum/projectName");
var fs_1 = require("fs");
var uniqid_1 = __importDefault(require("uniqid"));
exports.createStrategy = function (req, res) {
    var patch = uniqid_1.default();
    req.pipe(fs_1.createWriteStream("./" + patch)).on('finish', function () {
        fs_1.readFile("./" + patch, function (error, fileData) {
            if (error) {
                var response = new ApplicationResponse_1.ApplicationResponse(400, {}, "ERROR TO READ DATA");
                res.status(response.statusCode).json({ message: response.message });
                return;
            }
            fs_1.unlink("./" + patch, function () { return __awaiter(_this, void 0, void 0, function () {
                var body, serviceResponse, e_1, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            body = JSON.parse(fileData.toString());
                            return [4 /*yield*/, factorPool_1.services.get(projectName_1.HeaderProject[req.header(factorPool_1.HEADER_PROJECT_NAME)]).createStrategy(body, res.locals)];
                        case 1:
                            serviceResponse = _a.sent();
                            res.status(serviceResponse.statusCode).json(serviceResponse);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            error_1 = ExceptionResponse_1.ExceptionResponse.exec(e_1);
                            res.status(error_1.statusCode).json(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        });
    });
};
exports.getStrategies = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var strategytype, serviceResponse, e_2, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                strategytype = req.header(factorPool_1.HEADER_PROJECT_NAME);
                return [4 /*yield*/, factorPool_1.services.get(projectName_1.HeaderProject[strategytype]).getStrategies(req.query.status, strategytype, req.query.fields)];
            case 1:
                serviceResponse = _a.sent();
                res.status(serviceResponse.statusCode).json(serviceResponse);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log('error', e_2);
                error = ExceptionResponse_1.ExceptionResponse.exec(e_2);
                res.status(error.statusCode).json(error);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getStrategyById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var serviceResponse, e_3, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, factorPool_1.services.get(projectName_1.HeaderProject[req.header(factorPool_1.HEADER_PROJECT_NAME)]).getStrategiesById(req.params.id)];
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
// export const updateStrategy = async (req: Request, res: Response) => {
//   res.status(400).json(new ApplicationResponse(400, '', 'Não é permitido a atualização de uma estratégia'));
// }
// export const deleteStrategy = async (req: Request, res: Response) => {
//   try {
//     const serviceResponse = await (services.get(HeaderProject[req.header(HEADER_PROJECT_NAME) as string]) as ServiceStrategy<any, Typegoose>).deleteStrategy(req.params.id);
//     res.status(serviceResponse.statusCode).json(serviceResponse);
//   } catch (e) {
//     const error = ExceptionResponse.exec(e);
//     res.status(error.statusCode).json(error);
//   }
// };
exports.disableStrategy = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var serviceResponse, e_4, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, factorPool_1.services.get(projectName_1.HeaderProject[req.header(factorPool_1.HEADER_PROJECT_NAME)]).disableStrategy(req.params.id, res.locals.user)];
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
exports.enableStrategy = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var serviceResponse, e_5, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, factorPool_1.services.get(projectName_1.HeaderProject[req.header(factorPool_1.HEADER_PROJECT_NAME)]).enableStrategy(req.params.id, res.locals.user)];
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
exports.findStrategyByName = function (name, version, strategyType) {
    var schema = factorPool_1.schemas.get('DEFAULT');
    if (schema)
        return schema.findOne({ name: name, version: version });
};
//# sourceMappingURL=strategy.js.map