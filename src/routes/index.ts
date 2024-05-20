import { Router } from 'express';

import jsonWebToken from 'jsonwebtoken';

const routes = Router();

routes.get('/', (req, res) => {
    const healthCheck = {
        status: true,
        message: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now(),
        host: req.headers.host
    };

    res.send(healthCheck);
});

routes.post('/login', (_req, res) => {
    const token = jsonWebToken.sign({ userId: `__userId__` }, 'hexSchool', { expiresIn: '7d' });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'None' as any,
        secure: true,
        maxAge: 900000
    }).send({
        status: true,
        message: '登入成功',
        token
    });
});

routes.get('/check', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        res.send({
            status: true,
            message: '未登入',
            cookies: JSON.stringify(token)
        });
        return;
    }

    const jwtPayload = jsonWebToken.verify(token, 'hexSchool');

    res.send({
        status: true,
        message: jwtPayload
    });
});

routes.use((_req, res) => {
    res.status(404).send({
        status: false,
        message: '無此路由資訊'
    });
});

export default routes;
