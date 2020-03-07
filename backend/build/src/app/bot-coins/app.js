"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var middlewares_1 = require("./middlewares");
var express_1 = __importDefault(require("express"));
var executed_strategies_route_1 = __importDefault(require("./routes/executed-strategies.route"));
var balance_route_1 = __importDefault(require("./routes/balance.route"));
var app = express_1.default();
middlewares_1.configMiddleware(app);
app.use('/executed-strategies', executed_strategies_route_1.default);
app.use('/balance', balance_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map