import { Request, Response } from "express";

const morgan = require('morgan');

morgan.token('id', (req, res) => req.id);
morgan.token('user-id', (req, res: Response) => res.locals.user ? res.locals.user.uid : req.headers['user-id']);
morgan.token('ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip;
});
morgan.token('req-params', (req: Request) => JSON.stringify(req.params));
morgan.token('req-body', (req: Request) => JSON.stringify(req.body));
morgan.token('req-headers', (req: Request) =>  JSON.stringify(req.headers));

export default morgan;

