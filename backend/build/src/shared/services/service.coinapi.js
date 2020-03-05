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
var ApplicationResponse_1 = require("../models/ApplicationResponse");
var moment = require('moment');
var axios = require('axios');
var ServiceCoinapi = /** @class */ (function () {
    function ServiceCoinapi() {
        this.baseUrl = process.env.COINAPI_URI;
        this.apiKey = process.env.COINAPI_CREDENTIAL;
        this.HEADER_X_COINAPI_KEY = "X-CoinAPI-Key";
    }
    ServiceCoinapi.prototype.getCandleHistory = function (symbolId, period_id, time_start, time_end, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, start, end, params, response, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        start = moment(time_start).toISOString();
                        end = moment(time_end).toISOString();
                        params = {
                            period_id: period_id,
                            time_start: start,
                            time_end: end,
                        };
                        if (limit)
                            params['limit'] = limit;
                        return [4 /*yield*/, axios.get(this.baseUrl + "v1/ohlcv/" + symbolId + "/history", {
                                params: params,
                                headers: (_a = {},
                                    _a[this.HEADER_X_COINAPI_KEY] = this.apiKey,
                                    _a)
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response.data)];
                    case 2:
                        e_1 = _b.sent();
                        if (e_1 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_1;
                        throw new ApplicationResponse_1.ApplicationResponse(400, e_1.response.data, e_1.response.data.error);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceCoinapi.prototype.getCandleLatest = function (symbolId, period_id, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, params, response, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        params = {
                            period_id: period_id,
                        };
                        if (limit)
                            params['limit'] = limit;
                        return [4 /*yield*/, axios.get(this.baseUrl + "v1/ohlcv/" + symbolId + "/latest", {
                                params: params,
                                headers: (_a = {},
                                    _a[this.HEADER_X_COINAPI_KEY] = this.apiKey,
                                    _a)
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, response.data)];
                    case 2:
                        e_2 = _b.sent();
                        if (e_2 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_2;
                        throw new ApplicationResponse_1.ApplicationResponse(400, e_2.response.data, e_2.response.data.error);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceCoinapi;
}());
exports.ServiceCoinapi = ServiceCoinapi;
//# sourceMappingURL=service.coinapi.js.map