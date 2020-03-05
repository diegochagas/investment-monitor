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
var Page_1 = require("./Page");
var class_validator_1 = require("class-validator");
/**
 * @typedef Application
 * @property { string } name.required - Application name - Market maker
 * @property { Array.<Page> } pages - Pages
 */
var Application = /** @class */ (function () {
    function Application() {
        this.name = undefined;
        this.pages = [new Page_1.Page()];
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Application.prototype, "name", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsArray(),
        __metadata("design:type", Array)
    ], Application.prototype, "pages", void 0);
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=Application.js.map