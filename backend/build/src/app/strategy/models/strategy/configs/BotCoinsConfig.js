"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var ConfigStrategy_1 = require("./ConfigStrategy");
/**
 * @typedef Config
 */
var BotCoinsConfig = /** @class */ (function () {
    function BotCoinsConfig() {
        this.strategy = new ConfigStrategy_1.ConfigStrategy();
    }
    return BotCoinsConfig;
}());
exports.BotCoinsConfig = BotCoinsConfig;
//# sourceMappingURL=BotCoinsConfig.js.map