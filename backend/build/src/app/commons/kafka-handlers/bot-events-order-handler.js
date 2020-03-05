"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var area_en_1 = require("../../../shared/models/enum/area.en");
var winston_1 = __importDefault(require("../../../shared/middlewares/winston"));
var BotEvents_1 = require("../models/bot-events/BotEvents");
var prefix = 'BOT_EVENTS_ORDER_HANDLER => ';
var BotEventsOrderHandler = /** @class */ (function () {
    function BotEventsOrderHandler() {
    }
    BotEventsOrderHandler.prototype.send = function (topic, message, data, webSocket) {
        winston_1.default.info(prefix + 'processing Order method from kafka message');
        winston_1.default.info(prefix + 'message from: ' + message.type);
        var order = {
            type: (message.action + "_" + message.type + "_" + message.instance).toUpperCase(),
            data: data
        };
        BotEvents_1.BotEventsSchema.findOneAndUpdate({ type: order.type }, order, { upsert: true, new: true }).then(function () {
            winston_1.default.info(prefix + ("Last message saved with key: " + order.type), order);
        });
        webSocket.send(__assign({ type: 'order' }, data), area_en_1.RoomDashboard[message.type] + "-" + message.instance);
    };
    return BotEventsOrderHandler;
}());
exports.BotEventsOrderHandler = BotEventsOrderHandler;
//# sourceMappingURL=bot-events-order-handler.js.map