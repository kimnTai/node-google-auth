namespace NodeJS {
    interface ProcessEnv {
        PORT: number;

        NODE_ENV: 'development' | 'production';

        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        GOOGLE_CLIENT_CALLBACK_URL: string;
    }
}
