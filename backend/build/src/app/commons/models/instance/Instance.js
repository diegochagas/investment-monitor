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
var typegoose_1 = require("typegoose");
require("reflect-metadata");
var class_validator_1 = require("class-validator");
var db_1 = require("../../db/db");
var InstanceStatus;
(function (InstanceStatus) {
    InstanceStatus["STALLED"] = "STALLED";
    InstanceStatus["OFFLINE"] = "OFFLINE";
    InstanceStatus["RUNNING"] = "RUNNING";
    InstanceStatus["PENDING"] = "PENDING";
    InstanceStatus["STOPPED"] = "STOPPED";
})(InstanceStatus = exports.InstanceStatus || (exports.InstanceStatus = {}));
var InstanceType;
(function (InstanceType) {
    InstanceType["GARCH"] = "GARCH";
    InstanceType["TELEGRAM"] = "TELEGRAM";
    InstanceType["MARKETMAKER"] = "MARKETMAKER";
})(InstanceType = exports.InstanceType || (exports.InstanceType = {}));
/**
 * @typedef Instance
 * @property { string } label.required - Instance label - eg: label name
 * @property { string } instanceId.required - docker container name of instance - eg: mm-node-01
 * @property { enum } type - InstanceType - eg: 'GARCH', 'TELEGRAM', 'MARKETMAKER'
 * @property { enum } status - InstanceStatus - eg: 'STALLED', 'OFFLINE', 'RUNNING', 'PENDING', 'STOPPED'
 * @property { object } strategy - strategyId or strategy model
 * @property { string } reason - Error description
 */
var Instance = /** @class */ (function (_super) {
    __extends(Instance, _super);
    function Instance() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = undefined;
        _this.instanceId = undefined;
        _this.type = undefined;
        _this.status = InstanceStatus.STOPPED;
        return _this;
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Instance.prototype, "label", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop({ unique: true }),
        __metadata("design:type", String)
    ], Instance.prototype, "instanceId", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEnum(InstanceType),
        typegoose_1.prop({ enum: InstanceType }),
        __metadata("design:type", String)
    ], Instance.prototype, "type", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEnum(InstanceStatus),
        typegoose_1.prop({ enum: InstanceStatus }),
        __metadata("design:type", String)
    ], Instance.prototype, "status", void 0);
    __decorate([
        typegoose_1.prop( /*{ ref: AbstractStrategy, required: false }*/),
        __metadata("design:type", Object)
    ], Instance.prototype, "strategy", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], Instance.prototype, "updatedAt", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Instance.prototype, "reason", void 0);
    return Instance;
}(typegoose_1.Typegoose));
exports.Instance = Instance;
exports.InstanceSchema = new Instance().getModelForClass(Instance, {
    existingConnection: db_1.connectToCommonDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true }, collection: 'instance',
    }
});
//# sourceMappingURL=Instance.js.map