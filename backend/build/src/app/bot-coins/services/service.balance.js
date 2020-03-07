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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var ContentSnapshots_1 = require("../models/ContentSnapshots");
var ServiceBalance = /** @class */ (function () {
    function ServiceBalance() {
    }
    ServiceBalance.getBalanceDifference = function (startDate, endDate, mainCurrency) {
        var _this = this;
        if (mainCurrency === void 0) { mainCurrency = "BTC"; }
        if (!startDate || !endDate) {
            throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get balance, startDate and endDate are required');
        }
        var lastBalance = ContentSnapshots_1.ContextSnapshotsSchema.findOne({ 'timeStamp': { '$lt': endDate } }).sort({ id: -1 });
        var initialBalance = ContentSnapshots_1.ContextSnapshotsSchema.findOne({ 'timeStamp': { '$gt': startDate } });
        return Promise.all([lastBalance, initialBalance]).then(function (_a) {
            var _b = __read(_a, 2), final = _b[0], initial = _b[1];
            var response = {
                initial: _this.formatBalance(initial, mainCurrency),
                final: _this.formatBalance(final, mainCurrency)
            };
            return new ApplicationResponse_1.ApplicationResponse(200, response);
        }).catch(function (e) {
            if (e instanceof ApplicationResponse_1.ApplicationResponse)
                throw e;
            throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get balance');
        });
    };
    ServiceBalance.getCurrencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastContext, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ContentSnapshots_1.ContextSnapshotsSchema.findOne({}).sort({ id: -1 })];
                    case 1:
                        lastContext = _a.sent();
                        if (lastContext) {
                            response = lastContext.globalRates ? Object.keys(lastContext.globalRates['BTC']) : [];
                            return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, __spread(response, ['BTC']))];
                        }
                        return [2 /*return*/, new ApplicationResponse_1.ApplicationResponse(200, [])];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof ApplicationResponse_1.ApplicationResponse)
                            throw e_1;
                        throw new ApplicationResponse_1.ApplicationResponse(400, {}, 'Error to get currency');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceBalance.formatBalance = function (rawFormat, mainCurrency) {
        var _this = this;
        if (rawFormat === null) {
            return {
                mainCurrency: mainCurrency,
                totalValue: 0,
                timeStamp: Date.now(),
                valuesByExchange: []
            };
        }
        var valuesByExchange = rawFormat.tradingContexts.map(function (context) {
            return context.exchanges && context.exchanges.map(function (exchange) { return _this.getLastKnownBalance(rawFormat, exchange, mainCurrency); });
        })[0];
        var totalValue = valuesByExchange ? valuesByExchange.reduce(function (sum, value) { return sum + (value.totalValue ? value.totalValue : 0); }, 0) : 0;
        return {
            mainCurrency: mainCurrency,
            totalValue: totalValue,
            timeStamp: rawFormat.timeStamp ? rawFormat.timeStamp : 0,
            valuesByExchange: valuesByExchange ? valuesByExchange : []
        };
    };
    ServiceBalance.getLastKnownBalance = function (rawFormat, exchange, mainCurrency) {
        var _this = this;
        var name = exchange.id ? exchange.id : '';
        if (!exchange.wallets || exchange.wallets.length <= 0) {
            return {
                totalValue: 0,
                name: name,
                lastKnownBalances: {}
            };
        }
        // @todo caso existe mais de uma wallet será necessário fazer o merge
        var lastKnownBalance = {
            totalValue: 0
        };
        if (exchange.wallets && rawFormat.globalRates && rawFormat.globalRates['BTC']) {
            lastKnownBalance = exchange.wallets.map(function (wallet) {
                return _this.convertValueToBtc(wallet.lastKnownBalance, rawFormat.globalRates);
            })[0];
            if (mainCurrency !== 'BTC') {
                lastKnownBalance = this.convertValueTo(lastKnownBalance, rawFormat.globalRates['BTC'], mainCurrency);
            }
        }
        return __assign({ name: name }, lastKnownBalance);
    };
    ServiceBalance.convertValueToBtc = function (knownBalance, rates) {
        var convertedValues = {};
        var totalValue = 0;
        var mainCurrency = 'BTC';
        Object.entries(knownBalance).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            if (key === mainCurrency) {
                convertedValues[key] = value;
                totalValue += convertedValues[key];
            }
            else if (rates !== undefined && rates[mainCurrency] && rates[mainCurrency][key]) {
                var rate = rates[mainCurrency][key];
                convertedValues[key] = value * rate;
                totalValue += convertedValues[key];
            }
        });
        return {
            totalValue: totalValue,
            lastKnownBalances: convertedValues
        };
    };
    ServiceBalance.convertValueTo = function (balance, rates, mainCurrency) {
        var convertedValues = {};
        Object.entries(balance.lastKnownBalances).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            convertedValues[key] = value / rates[mainCurrency];
        });
        return {
            totalValue: balance.totalValue / rates[mainCurrency],
            lastKnownBalance: convertedValues
        };
    };
    return ServiceBalance;
}());
exports.ServiceBalance = ServiceBalance;
//# sourceMappingURL=service.balance.js.map