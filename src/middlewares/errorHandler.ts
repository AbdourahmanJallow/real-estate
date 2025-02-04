import { NextFunction, Response, Request } from 'express';
import ApiError from '../utils/ApiError';

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  console.log(error);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error.',
  });
};

export default errorHandler;

/**
 * In a real-world application, you would typically
  use a logging library like Winston or Sentry to handle errors.
 */
