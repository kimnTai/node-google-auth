namespace NodeJS {
    interface ProcessEnv {
        PORT: number;

        JWT_EXPIRES_DAY: string;
        JWT_SECRET: string;

        NODE_ENV: 'development' | 'production';
    }
}
