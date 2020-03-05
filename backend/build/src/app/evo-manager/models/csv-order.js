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
var db_1 = require("../db/db");
var SIDE;
(function (SIDE) {
    SIDE["SELL"] = "SELL";
    SIDE["BUY"] = "BUY";
})(SIDE = exports.SIDE || (exports.SIDE = {}));
var ORDER_TYPE;
(function (ORDER_TYPE) {
    ORDER_TYPE["MARKET"] = "MARKET";
    ORDER_TYPE["LIMIT"] = "LIMIT";
})(ORDER_TYPE = exports.ORDER_TYPE || (exports.ORDER_TYPE = {}));
var CsvOrder = /** @class */ (function (_super) {
    __extends(CsvOrder, _super);
    function CsvOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.csvFileName = undefined;
        _this.base = undefined;
        _this.quote = undefined;
        _this.quantity = undefined;
        _this.price = undefined;
        _this.type = undefined;
        _this.side = undefined;
        _this.name = undefined;
        _this.email_quantum = undefined;
        _this.executionStatus = [];
        return _this;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop({ uppercase: true }),
        __metadata("design:type", String)
    ], CsvOrder.prototype, "csvFileName", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop({ uppercase: true }),
        __metadata("design:type", String)
    ], CsvOrder.prototype, "base", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop({ uppercase: true }),
        __metadata("design:type", String)
    ], CsvOrder.prototype, "quote", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], CsvOrder.prototype, "quantity", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], CsvOrder.prototype, "price", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEnum(ORDER_TYPE),
        typegoose_1.prop({ enum: ORDER_TYPE }),
        __metadata("design:type", String)
    ], CsvOrder.prototype, "type", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEnum(SIDE),
        typegoose_1.prop({ enum: SIDE }),
        __metadata("design:type", String)
    ], CsvOrder.prototype, "side", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], CsvOrder.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEmail(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], CsvOrder.prototype, "email_quantum", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Array)
    ], CsvOrder.prototype, "executionStatus", void 0);
    return CsvOrder;
}(typegoose_1.Typegoose));
exports.CsvOrder = CsvOrder;
exports.CsvOrderSchema = new CsvOrder().getModelForClass(CsvOrder, {
    existingConnection: db_1.connectToEvoManagerDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'csv-orders'
    }
});
//# sourceMappingURL=csv-order.js.map