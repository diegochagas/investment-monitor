"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var middlewares_1 = require("./middlewares");
var events_telegram_route_1 = __importDefault(require("./routes/events-telegram.route"));
var metrics_telegram_route_1 = __importDefault(require("./routes/metrics-telegram.route"));
var app = express();
middlewares_1.configMiddleware(app);
app.use('/events', events_telegram_route_1.default);
app.use('/metrics', metrics_telegram_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map