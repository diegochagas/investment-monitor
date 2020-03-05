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
 * @typedef Group
 * @property { string } name.required - Group name - eg: Binance friends
 * @property { string } groupId.required - Group Id - eg: 1234
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = undefined;
        _this.groupId = undefined;
        return _this;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Group.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNumber(),
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Group.prototype, "groupId", void 0);
    return Group;
}(typegoose_1.Typegoose));
exports.Group = Group;
exports.GroupSchema = new Group().getModelForClass(Group, {
    existingConnection: db_1.connectToCommonDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'group'
    }
});
//# sourceMappingURL=Group.js.map