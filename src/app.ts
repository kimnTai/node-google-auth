import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import Routes from '@/routes';

const app = express();

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
});
app.use(
    cors({
        origin(_origin, callback) {
            callback(null, true);
        },
        optionsSuccessStatus: 200
    })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(Routes);

app.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`);
});

process.on('uncaughtException', error => {
    console.error('未捕獲的異常！');
    console.error(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('未捕捉到的 rejection :', promise, '原因：', reason);
});
