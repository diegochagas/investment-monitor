import {Request, Response} from "express";
const admin = (require as any).main.require('firebase-admin');
const ignorePath = ['api-docs', 'api-docs.json'];
export function auth_public_get(req: Request, res: Response, next) {
    if(req.method !== 'GET') {
        const authorization = req.header('Authorization');
        if (authorization) {
            let token = authorization.split(' ');
            admin.auth().verifyIdToken(token[1])
                .then((decodedToken) => {
                    res.locals.user = decodedToken;
                    next();
                })
                .catch(err => {
                    res.sendStatus(401);
                });
        } else {
            res.sendStatus(401);
        }
    }else {
        next();
    }
}

export function auth(req: Request, res: Response, next) {
    if(ignorePath.includes(req.path.split('/')[1])) return next();

    const authorization = req.header('Authorization');
    if (authorization) {
        let token = authorization.split(' ');
        admin.auth().verifyIdToken(token[1])
            .then((decodedToken) => {
                res.locals.user = decodedToken;
                next();
            })
            .catch(err => {
                res.sendStatus(401);
            });
    } else {
        res.sendStatus(401);
    }
}
