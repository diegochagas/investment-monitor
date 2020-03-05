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
var Application_1 = require("./Application");
var class_validator_1 = require("class-validator");
/**
 * @typedef Profile
 * @property { string } profileName.required - Profile name - eg: admin
 * @property { Array.<Application> } applications - Applications
 */
var Profile = /** @class */ (function () {
    function Profile() {
        this.profileName = undefined;
        this.applications = [new Application_1.Application()];
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Profile.prototype, "profileName", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsArray(),
        __metadata("design:type", Array)
    ], Profile.prototype, "applications", void 0);
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map