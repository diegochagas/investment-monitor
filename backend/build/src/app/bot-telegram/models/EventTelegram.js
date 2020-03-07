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
var IContent_1 = require("./interfaces/IContent");
var Actions_1 = require("./enums/Actions");
var db_topic_persistent_1 = require("../../../shared/db/db-topic-persistent");
/**
 * @typedef EventsTelegram
 * @property { string } type - Type -eg: Telegram
 * @property { enum } action - Action - eg: INDICATORS,ORDERS
 * @property { string } instance - Instance ID - eg: telegram.singnal
 * @property { IConfigStrategy.model } strategy
 * @property { integer } timestamp
 * @property { IContent.model } content
 */
var EventsTelegram = /** @class */ (function (_super) {
    __extends(EventsTelegram, _super);
    function EventsTelegram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = undefined;
        _this.action = undefined;
        _this.instance = undefined;
        _this.strategy = undefined;
        _this.timestamp = undefined;
        _this.content = undefined;
        return _this;
    }
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], EventsTelegram.prototype, "type", void 0);
    __decorate([
        typegoose_1.prop({
            enum: Actions_1.Action
        }),
        __metadata("design:type", String)
    ], EventsTelegram.prototype, "action", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], EventsTelegram.prototype, "instance", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], EventsTelegram.prototype, "strategy", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], EventsTelegram.prototype, "timestamp", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", IContent_1.IContent)
    ], EventsTelegram.prototype, "content", void 0);
    return EventsTelegram;
}(typegoose_1.Typegoose));
exports.EventsTelegram = EventsTelegram;
exports.EventsTelegramSchema = new EventsTelegram().getModelForClass(EventsTelegram, {
    existingConnection: db_topic_persistent_1.connectToTopicPersistentDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'BOT_EVENTS_TELEGRAM'
    }
});
/**
 * @typedef IConfigStrategy
 * @property { string } name
 * @property { integer } version
 */
//# sourceMappingURL=EventTelegram.js.map