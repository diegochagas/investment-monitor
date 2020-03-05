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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var class_validator_1 = require("class-validator");
var typegoose_1 = require("typegoose");
var IConfig_1 = require("./interfaces/IConfig");
require("reflect-metadata");
var db_1 = require("../db/db");
var StrategyHistory = /** @class */ (function (_super) {
    __extends(StrategyHistory, _super);
    function StrategyHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.version = undefined;
        _this.name = undefined;
        _this.endTimestamp = undefined;
        _this.initTimestamp = undefined;
        _this.parentId = undefined;
        _this.config = new IConfig_1.IConfig();
        return _this;
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], StrategyHistory.prototype, "version", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], StrategyHistory.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], StrategyHistory.prototype, "endTimestamp", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], StrategyHistory.prototype, "initTimestamp", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], StrategyHistory.prototype, "parentId", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], StrategyHistory.prototype, "config", void 0);
    return StrategyHistory;
}(typegoose_1.Typegoose));
exports.StrategyHistory = StrategyHistory;
exports.StrategyHistorySchema = new StrategyHistory().getModelForClass(StrategyHistory, {
    existingConnection: db_1.connectToMarketMakerDB(),
    schemaOptions: {
        collection: 'strategies_history',
        timestamps: { createdAt: true, updatedAt: true },
    }
});
//# sourceMappingURL=StrategyHistory.js.map