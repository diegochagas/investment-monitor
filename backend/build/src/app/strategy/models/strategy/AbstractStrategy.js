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
var class_validator_1 = require("class-validator");
var StrategyStatus_1 = require("./enums/StrategyStatus");
var ApplicationResponse_1 = require("../../../../shared/models/ApplicationResponse");
/**
 * @typedef AbstractStrategy
 * @property { string } name.required - AbstractStrategy name - eg: catatau_teste
 * @property { createdBy } createdBy.required - User id, get from header - eg: 4c34c-3t43t-34tb3vt-vb34t
 * @property { enum } status.required - Status - eg: active. inactive
 * @property { updatedBy } updatedBy.required - User id, get from header - eg: 4c34c-3t43t-34tb3vt-vb34t
 * @property { object } config.required -  - eg: GarchConfig, MarketMakerConfig, TelegramConfig
 * @property { string } iniPair.required
 * @property { string } finPair.required
 */
var AbstractStrategy = /** @class */ (function (_super) {
    __extends(AbstractStrategy, _super);
    function AbstractStrategy(type) {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.createdBy = undefined;
        _this.status = StrategyStatus_1.StrategyStatus.ACTIVE;
        _this.updatedBy = undefined;
        _this.version = 1;
        _this.instance = undefined;
        _this.config = new type();
        return _this;
    }
    /*protected*/ AbstractStrategy.prototype.assembleMockedValues = function (locals) {
        throw new Error("Method not implemented.");
    };
    AbstractStrategy.prototype.getHeaders = function () {
        throw new ApplicationResponse_1.ApplicationResponse(500, {}, 'Method not implemented');
    };
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], AbstractStrategy.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], AbstractStrategy.prototype, "createdBy", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(StrategyStatus_1.StrategyStatus),
        typegoose_1.prop({ enum: StrategyStatus_1.StrategyStatus }),
        __metadata("design:type", String)
    ], AbstractStrategy.prototype, "status", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], AbstractStrategy.prototype, "updatedBy", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.ValidateNested(),
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], AbstractStrategy.prototype, "config", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], AbstractStrategy.prototype, "presentationName", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], AbstractStrategy.prototype, "md5", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Boolean)
    ], AbstractStrategy.prototype, "used", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], AbstractStrategy.prototype, "version", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], AbstractStrategy.prototype, "instance", void 0);
    AbstractStrategy = __decorate([
        typegoose_1.pre('save', function (next) {
            this.config.walletId = this.name ? this.name.replace(/ /g, '') : "";
            var md5 = require('md5');
            var clone = JSON.parse(JSON.stringify(this));
            delete clone.config.strategy;
            this.md5 = md5(JSON.stringify(clone.config));
            this.presentationName = this.name + "-v." + this.config.strategy.version;
            next();
        }),
        __metadata("design:paramtypes", [Object])
    ], AbstractStrategy);
    return AbstractStrategy;
}(typegoose_1.Typegoose));
exports.AbstractStrategy = AbstractStrategy;
//# sourceMappingURL=AbstractStrategy.js.map