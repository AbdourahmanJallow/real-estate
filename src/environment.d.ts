declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: number;
      DATABASE_URL: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_TYPE: string;
      JWT_SECRET: string;
      OPENCAGE_API_KEY: string;
      JWT_REFRESH_SECRET: string;
      DEPLOY_USER: string;
      DEPLOY_HOST: string;
      DEPLOY_PATH: string;
    }
  }
}

export {};
