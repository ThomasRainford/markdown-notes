declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_HOST: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
  }
}
