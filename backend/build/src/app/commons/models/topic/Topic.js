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
var db_1 = require("../../db/db");
exports.TOPIC_QUEUE = "CRYPTODATA_CREATE_TOPIC";
var TopicType;
(function (TopicType) {
    TopicType["TICKER"] = "TICKER";
    TopicType["CANDLE"] = "CANDLE";
    TopicType["FOREX"] = "FOREX";
    TopicType["TRADE"] = "TRADE";
})(TopicType = exports.TopicType || (exports.TopicType = {}));
/**
 * @typedef Topic
 * @property { string } name.required - Topic name - eg: COINAPI_BRAZILIEX_TICKER_BTC_BRL
 * @property { enum } type.required - Topic type -eg: 'TICKER', 'CANDLE', 'FOREX', 'TRADE'
 * @property { string } group - Group of topic, send 'ALL' or null
 */
var Topic = /** @class */ (function (_super) {
    __extends(Topic, _super);
    function Topic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = undefined;
        _this.type = undefined;
        _this.group = undefined;
        return _this;
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        typegoose_1.prop({ unique: true }),
        __metadata("design:type", String)
    ], Topic.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(TopicType),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Topic.prototype, "type", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Topic.prototype, "group", void 0);
    return Topic;
}(typegoose_1.Typegoose));
exports.Topic = Topic;
exports.TopicSchema = new Topic().getModelForClass(Topic, {
    existingConnection: db_1.connectToCommonDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'topics'
    }
});
//# sourceMappingURL=Topic.js.map