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
/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/
var Order_1 = require("../models/Order");
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var populate_1 = require("../../../shared/helpers/populate");
var class_validator_1 = require("class-validator");
var handleValitateError_1 = require("../../../shared/helpers/handleValitateError");
var ServiceOrder = /** @class */ (function () {
    function ServiceOrder() {
    }
    ServiceOrder.prototype.getDashOrders = function (instance, query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, perPage, page, paginate, promiseOrders;
            return __generator(this, function (_a) {
                filter = { instance: instance };
                if (query.status)
                    filter.status = query.status;
                if (query.dtIni && query.dtFim)
                    filter["$and"] = [{ timestamp: { "$gte": query.dtIni } }, { timestamp: { "$lte": query.dtFim } }];
                console.log('filter', JSON.stringify(filter));
                perPage = parseInt(query.limit) || 50, page = Math.max(0, (parseInt(query.page) - 1));
                paginate = {
                    skip: (perPage * page),
                    limit: perPage
                };
                promiseOrders = Order_1.OrderSchema.find(filter, {}, paginate).sort({ timestamp: query.sort ? query.sort === 'asc' ? 1 : -1 : -1 }).exec();
                return [2 /*return*/, promiseOrders.then(function (orders) {
                        return new ApplicationResponse_1.ApplicationResponse(200, orders);
                    })
                        .catch(function (error) {
                        throw error;
                    })];
            });
        });
    };
    ;
    ServiceOrder.prototype.createOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var model, _a, response, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        model = populate_1.populate(Order_1.Order, order);
                        _a = handleValitateError_1.handleValidateError;
                        return [4 /*yield*/, class_validator_1.validate(model)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, new Order_1.OrderSchema(model).save()];
                    case 3:
                        response = _b.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response)];
                    case 4:
                        err_1 = _b.sent();
                        if (err_1 instanceof ApplicationResponse_1.ApplicationResponse)
                            return [2 /*return*/, err_1];
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Unable to create order');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceOrder;
}());
exports.ServiceOrder = ServiceOrder;
//# sourceMappingURL=service.order.js.map