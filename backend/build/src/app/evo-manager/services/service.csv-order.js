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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csv_order_1 = require("../models/csv-order");
var populate_1 = require("../../../shared/helpers/populate");
var handleValitateError_1 = require("../../../shared/helpers/handleValitateError");
var class_validator_1 = require("class-validator");
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var _ = __importStar(require("lodash"));
var winston_1 = __importDefault(require("../../../shared/middlewares/winston"));
var ServiceCsvOrder = /** @class */ (function () {
    function ServiceCsvOrder() {
    }
    ServiceCsvOrder.save = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, check, csv, success, errors, _b, _c, _d, i, line, model, _e, data_1, e_2, e_1_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, csv_order_1.CsvOrderSchema.find({ csvFileName: data.fileName.toUpperCase() }).exec()];
                    case 1:
                        check = _f.sent();
                        if (check.length > 0)
                            throw new ApplicationResponse_1.ApplicationResponse(409, {}, 'File name already exists');
                        csv = data.fileData.map(function (item) {
                            item.csvFileName = data.fileName;
                            return item;
                        });
                        success = [];
                        errors = [];
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 11, 12, 13]);
                        _b = __values(csv.entries()), _c = _b.next();
                        _f.label = 3;
                    case 3:
                        if (!!_c.done) return [3 /*break*/, 10];
                        _d = __read(_c.value, 2), i = _d[0], line = _d[1];
                        _f.label = 4;
                    case 4:
                        _f.trys.push([4, 8, , 9]);
                        model = populate_1.populate(csv_order_1.CsvOrder, line);
                        _e = handleValitateError_1.handleValidateError;
                        return [4 /*yield*/, class_validator_1.validate(model)];
                    case 5: return [4 /*yield*/, _e.apply(void 0, [_f.sent()])];
                    case 6:
                        _f.sent();
                        return [4 /*yield*/, new csv_order_1.CsvOrderSchema(model).save()];
                    case 7:
                        data_1 = _f.sent();
                        success.push(data_1);
                        return [3 /*break*/, 9];
                    case 8:
                        e_2 = _f.sent();
                        winston_1.default.error("ServiceCsvOrder::save::Error - " + e_2.message);
                        if (e_2 instanceof ApplicationResponse_1.ApplicationResponse)
                            errors.push({ errors: e_2.data, fileIndex: i });
                        else
                            throw new ApplicationResponse_1.ApplicationResponse(400, e_2, 'Error to save file');
                        return [3 /*break*/, 9];
                    case 9:
                        _c = _b.next();
                        return [3 /*break*/, 3];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, { success: success, errors: errors })];
                }
            });
        });
    };
    ServiceCsvOrder.getAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, csv_order_1.CsvOrderSchema.find().exec()];
                    case 1:
                        response = _a.sent();
                        if (query.groupBy)
                            response = _.groupBy(response, "csvFileName");
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                    case 2:
                        e_3 = _a.sent();
                        winston_1.default.error("ServiceCsvOrder::getAll::Error - " + e_3.message);
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get csv orders');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceCsvOrder.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, csv_order_1.CsvOrderSchema.findById(id).exec()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                    case 2:
                        e_4 = _a.sent();
                        winston_1.default.error("ServiceCsvOrder::getById::Error - " + e_4.message);
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get order');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceCsvOrder.getByFileName = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, csv_order_1.CsvOrderSchema.find({ csvFileName: fileName.toUpperCase() }).exec()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                    case 2:
                        e_5 = _a.sent();
                        winston_1.default.error("ServiceCsvOrder::getByFileName::Error - " + e_5.message);
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get order by file name');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceCsvOrder.updateExecutionStatus = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, csv_order_1.CsvOrderSchema.findOneAndUpdate({ _id: id }, { $push: { executionStatus: status } }, { new: true }).exec()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                    case 2:
                        e_6 = _a.sent();
                        winston_1.default.error("ServiceCsvOrder::updateExecutionStatus::Error - " + e_6.message);
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to update order');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceCsvOrder;
}());
exports.ServiceCsvOrder = ServiceCsvOrder;
//# sourceMappingURL=service.csv-order.js.map