"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require.main.require('firebase-admin');
var ignorePath = ['api-docs', 'api-docs.json'];
function auth_public_get(req, res, next) {
    if (req.method !== 'GET') {
        var authorization = req.header('Authorization');
        if (authorization) {
            var token = authorization.split(' ');
            admin.auth().verifyIdToken(token[1])
                .then(function (decodedToken) {
                res.locals.user = decodedToken;
                next();
            })
                .catch(function (err) {
                res.sendStatus(401);
            });
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        next();
    }
}
exports.auth_public_get = auth_public_get;
function auth(req, res, next) {
    if (ignorePath.includes(req.path.split('/')[1]))
        return next();
    var authorization = req.header('Authorization');
    if (authorization) {
        var token = authorization.split(' ');
        admin.auth().verifyIdToken(token[1])
            .then(function (decodedToken) {
            res.locals.user = decodedToken;
            next();
        })
            .catch(function (err) {
            res.sendStatus(401);
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.auth = auth;
//# sourceMappingURL=express-firebase-custom-auth.js.map