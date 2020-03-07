"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var typegoose_1 = require("typegoose");
var db_1 = require("../db/db");
/**
 * @typedef ExecutedStrategies
 * @property { integer } sessionTimeStamp
 * @property { integer } timeStamp
 * @property { Operation.model } operation
 */
var ExecutedStrategies = /** @class */ (function (_super) {
    __extends(ExecutedStrategies, _super);
    function ExecutedStrategies() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sessionTimeStamp = undefined;
        _this.timeStamp = undefined;
        _this.operation = undefined;
        return _this;
    }
    return ExecutedStrategies;
}(typegoose_1.Typegoose));
exports.ExecutedStrategies = ExecutedStrategies;
exports.ExecutedStrategiesSchema = new ExecutedStrategies().getModelForClass(ExecutedStrategies, {
    existingConnection: db_1.connectToArbitrorDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'executedStrategies'
    }
});
//# sourceMappingURL=ExecutedStrategies.js.map