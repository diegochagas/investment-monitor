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
var prefix = 'BOT_EVENTS_INDICATOR_HANDLER => ';
var BotEventsIndicatorHandler = /** @class */ (function () {
    function BotEventsIndicatorHandler() {
    }
    BotEventsIndicatorHandler.prototype.send = function (topic, message, data, webSocket) {
        winston_1.default.info(prefix + 'processing Indicator method from kafka message');
        winston_1.default.info(prefix + 'message from: ' + message.type);
        var indicator = {
            type: (message.action + "_" + message.type + "_" + message.instance).toUpperCase(),
            data: data
        };
        BotEvents_1.BotEventsSchema.findOneAndUpdate({ type: indicator.type }, indicator, { upsert: true, new: true }).then(function () {
            winston_1.default.info(prefix + ("Last message saved with key: " + indicator.type + " => "), indicator);
        });
        webSocket.send(__assign({ type: 'indicator' }, data), area_en_1.RoomDashboard[message.type] + "-" + message.instance);
    };
    return BotEventsIndicatorHandler;
}());
exports.BotEventsIndicatorHandler = BotEventsIndicatorHandler;
//# sourceMappingURL=bot-events-indicator-handler.js.map