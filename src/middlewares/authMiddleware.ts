import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import ApiError from '../utils/ApiError';

interface AuthRequest extends Request {
  user?: User;
}

const userService = new UserService();

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw new ApiError('No token provided', 401);

  jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded: any) => {
    if (err) throw new ApiError('Invalid token', 401);

    const user = await userService.findOneById(decoded.id);
    req.user = user;

    next();
  });
};
