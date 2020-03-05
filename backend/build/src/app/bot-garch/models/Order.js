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
var OrderContent_1 = require("./OrderContent");
var db_topic_persistent_1 = require("../../../shared/db/db-topic-persistent");
/**
 * @typedef Order
 * @property { string } action
 * @property { string } type
 * @property { string } instance
 * @property { OrderContent.model } content
 * @property { IConfigStrategy.model } strategy
 */
var OrderGarch = /** @class */ (function (_super) {
    __extends(OrderGarch, _super);
    function OrderGarch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], OrderGarch.prototype, "action", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], OrderGarch.prototype, "type", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], OrderGarch.prototype, "instance", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", OrderContent_1.OrderContent)
    ], OrderGarch.prototype, "content", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], OrderGarch.prototype, "strategy", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], OrderGarch.prototype, "timestamp", void 0);
    return OrderGarch;
}(typegoose_1.Typegoose));
exports.OrderGarch = OrderGarch;
exports.OrderGarchSchema = new OrderGarch().getModelForClass(OrderGarch, {
    existingConnection: db_topic_persistent_1.connectToTopicPersistentDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'BOT_EVENTS_GARCH'
    }
});
/**
 * @typedef IConfigStrategy
 * @property { string } name
 * @property { integer } version
 */
//# sourceMappingURL=Order.js.map