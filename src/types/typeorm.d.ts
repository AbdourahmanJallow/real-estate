import 'typeorm';

declare module 'typeorm' {
  interface QueryFailedError {
    detail?: string;
  }
}
