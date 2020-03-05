"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var manager = __importStar(require("bitfolio-exchange-manager"));
var ExchangeManager = /** @class */ (function () {
    function ExchangeManager() {
        this.client = new manager.BitfolioExchangeManager({
            secretManager: {
                region: 'us-west-2'
            }
        });
    }
    ExchangeManager.getInstance = function () {
        if (!ExchangeManager.instance)
            ExchangeManager.instance = new ExchangeManager();
        return ExchangeManager.instance;
    };
    ExchangeManager.prototype.getClient = function () {
        return this.client;
    };
    return ExchangeManager;
}());
exports.ExchangeManager = ExchangeManager;
//# sourceMappingURL=ExchangeManager.js.map