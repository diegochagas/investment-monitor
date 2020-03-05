"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var morgan = require('morgan');
morgan.token('id', function (req, res) { return req.id; });
morgan.token('user-id', function (req, res) { return res.locals.user ? res.locals.user.uid : req.headers['user-id']; });
morgan.token('ip', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip;
});
morgan.token('req-params', function (req) { return JSON.stringify(req.params); });
morgan.token('req-body', function (req) { return JSON.stringify(req.body); });
morgan.token('req-headers', function (req) { return JSON.stringify(req.headers); });
exports.default = morgan;
//# sourceMappingURL=morgan.js.map