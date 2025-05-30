import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${new Date().toISOString()} ${req.method} ${req.protocol} ${
      req.originalUrl
    }`.blue.bold
  );

  next();
};
