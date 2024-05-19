import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import Routes from '@/routes';

const app = express();

app.use(cookieParser());
app.use(
    cors({
        origin: ['https://node-google-auth-1tu2.onrender.com'],
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/public', express.static('public'));

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
