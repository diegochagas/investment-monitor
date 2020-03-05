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
var db_1 = require("../../db/db");
/**
 * @typedef BotEvents
 * @property { object } data
 * @property { string } type
 */
var BotEvents = /** @class */ (function (_super) {
    __extends(BotEvents, _super);
    function BotEvents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], BotEvents.prototype, "data", void 0);
    __decorate([
        typegoose_1.prop({ unique: true, required: true }),
        __metadata("design:type", String)
    ], BotEvents.prototype, "type", void 0);
    return BotEvents;
}(typegoose_1.Typegoose));
exports.BotEvents = BotEvents;
exports.BotEventsSchema = new BotEvents().getModelForClass(BotEvents, {
    existingConnection: db_1.connectToCommonDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'bot-events'
    }
});
//# sourceMappingURL=BotEvents.js.map