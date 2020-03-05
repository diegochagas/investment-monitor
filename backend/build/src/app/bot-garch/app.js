"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("./middlewares");
var order_route_1 = __importDefault(require("./routes/order.route"));
var band_route_1 = __importDefault(require("./routes/band.route"));
var candle_route_1 = __importDefault(require("./routes/candle.route"));
var app = express_1.default();
middlewares_1.configMiddleware(app);
app.use('/order', order_route_1.default);
app.use('/band', band_route_1.default);
app.use('/candle', candle_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map