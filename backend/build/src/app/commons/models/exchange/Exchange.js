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
/**
 * @typedef Exchange
 * @property { string } name.required - Exchange name - eg: Binance
 * @property { string } url.required - Exchange url - eg: "https://api.com/"
 * @property { string } icon.required - Exchange icon - eg: "base64 str"
 */
var Exchange = /** @class */ (function (_super) {
    __extends(Exchange, _super);
    function Exchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = undefined;
        _this.url = undefined;
        _this.iconFile = undefined;
        // TODO voltar para defined quando tivermos autenticação
        _this.userUid = undefined;
        _this.maxConcurrentRequests = undefined;
        _this.minTimeBetweenRequests = undefined;
        return _this;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Exchange.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsUrl(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Exchange.prototype, "url", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Exchange.prototype, "iconFile", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Exchange.prototype, "userUid", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Exchange.prototype, "maxConcurrentRequests", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Exchange.prototype, "minTimeBetweenRequests", void 0);
    return Exchange;
}(typegoose_1.Typegoose));
exports.Exchange = Exchange;
exports.ExchangeSchema = new Exchange().getModelForClass(Exchange, {
    existingConnection: db_1.connectToCommonDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'exchange'
    }
});
//# sourceMappingURL=Exchange.js.map