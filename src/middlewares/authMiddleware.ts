import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import ApiError from '../utils/ApiError';
import { AuthRequest } from '../auth-request';

const userService = new UserService();

export default async function authenticateJWT(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw new ApiError('Unauthorized', 401);

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new ApiError('Unauthorized. No token provided', 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    if (!decoded) throw new ApiError('Invalid token', 401);

    const user = await userService.findOneById(decoded.id);

    if (!user)
      res.status(401).json({ message: 'Unauthorized. User not found' });

    req.user = user;

    next();
  } catch (error) {
    console.error('Jwt error: ', error);

    return res.status(401).json({
      message: 'Unauthorized. Failed to authenticate token',
    });
  }
}
