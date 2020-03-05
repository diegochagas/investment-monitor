"use strict";
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
var class_validator_1 = require("class-validator");
var ProfileRule;
(function (ProfileRule) {
    ProfileRule["WRITE"] = "write";
    ProfileRule["READ"] = "read";
})(ProfileRule = exports.ProfileRule || (exports.ProfileRule = {}));
/**
 * @typedef Page
 * @property { string } path.required - Path - eg: /instance
 * @property { enum } rule.required - Rule - eg: write, read
 */
var Page = /** @class */ (function () {
    function Page() {
        this.path = undefined;
        this.rule = undefined;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Page.prototype, "path", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEnum(ProfileRule),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Page.prototype, "rule", void 0);
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=Page.js.map