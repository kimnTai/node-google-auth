import { Router } from 'express';

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

routes.use((_req, res) => {
    res.status(404).send({
        status: false,
        message: '無此路由資訊'
    });
});

export default routes;
