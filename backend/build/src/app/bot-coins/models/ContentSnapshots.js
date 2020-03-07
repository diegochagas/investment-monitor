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
var db_1 = require("../db/db");
var GlobalRates_1 = require("./GlobalRates");
var ContextSnapshots = /** @class */ (function (_super) {
    __extends(ContextSnapshots, _super);
    function ContextSnapshots() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tradingContexts = [];
        _this.timeStamp = undefined;
        _this.version = undefined;
        return _this;
    }
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Array)
    ], ContextSnapshots.prototype, "tradingContexts", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", GlobalRates_1.GlobalRates)
    ], ContextSnapshots.prototype, "globalRates", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], ContextSnapshots.prototype, "timeStamp", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], ContextSnapshots.prototype, "version", void 0);
    return ContextSnapshots;
}(typegoose_1.Typegoose));
exports.ContextSnapshots = ContextSnapshots;
exports.ContextSnapshotsSchema = new ContextSnapshots().getModelForClass(ContextSnapshots, {
    existingConnection: db_1.connectToArbitrorDB(),
    schemaOptions: {
        collection: 'contextSnapshots'
    }
});
//# sourceMappingURL=ContentSnapshots.js.map