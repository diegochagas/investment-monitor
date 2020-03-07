"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ICoin_1 = require("./ICoin");
var IRebalancerPair = /** @class */ (function () {
    function IRebalancerPair(data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            _this[key] = new ICoin_1.ICoin();
        });
    }
    return IRebalancerPair;
}());
exports.IRebalancerPair = IRebalancerPair;
//# sourceMappingURL=IRebalancerPair.js.map