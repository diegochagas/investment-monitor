"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("./middlewares");
var csv_order_route_1 = __importDefault(require("./routes/csv-order.route"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var app = express_1.default();
middlewares_1.configMiddleware(app);
app.use('/csv-order', csv_order_route_1.default);
app.use('/user', user_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map