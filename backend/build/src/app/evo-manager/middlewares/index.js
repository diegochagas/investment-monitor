"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var addRequestId = require('express-request-id')();
exports.configMiddleware = function (app) {
    app.use(addRequestId);
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
    // app.use(validateHeader);
    if (process.env.NODE_ENV !== 'local') {
        //app.use('/', auth);
        //app.use(authRouteMiddleware);
    }
};
//# sourceMappingURL=index.js.map