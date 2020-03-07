"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRebalancerPair_1 = require("./IRebalancerPair");
var IRebalancer = /** @class */ (function () {
    function IRebalancer(data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            _this[key] = new IRebalancerPair_1.IRebalancerPair(data);
        });
    }
    return IRebalancer;
}());
exports.IRebalancer = IRebalancer;
//# sourceMappingURL=IRebalancer.js.map