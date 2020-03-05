"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var account_routes_1 = __importDefault(require("./routes/account.routes"));
var middlewares_1 = require("./middlewares");
var secret_keys_route_1 = __importDefault(require("./routes/secret-keys.route"));
var app = express_1.default();
middlewares_1.configMiddleware(app);
app.use('/account', account_routes_1.default);
app.use('/secret-key', secret_keys_route_1.default);
var expressSwagger = require('express-swagger-generator')(app);
exports.default = app;
//# sourceMappingURL=app.js.map