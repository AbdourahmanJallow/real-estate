import { NextFunction, Response, Request } from 'express';
import ApiError from '../utils/ApiError';
import { QueryFailedError } from 'typeorm';

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  console.log(error);

  // Handle TypeORM QueryFailedError for duplicate key
  if (
    err instanceof QueryFailedError &&
    err.message.includes('duplicate key')
  ) {
    const queryError = err as QueryFailedError & { detail?: string }; // Cast to include 'detail'
    const field = queryError.detail?.match(/\((.*?)\)/)?.[1] || 'field';
    const message = `Duplicate value for ${field}. Please use a different value.`;

    error = new ApiError(message, 400);
  }

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
