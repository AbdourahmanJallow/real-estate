import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import ApiError from '../utils/ApiError';

const userService = new UserService();

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw new ApiError('No token provided', 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: number;
  };

  if (!decoded) throw new ApiError('Invalid token', 401);

  const user = await userService.findOneById(decoded.id);
  req.user = user;

  next();
};
