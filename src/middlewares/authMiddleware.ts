import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
// import ApiError from '../utils/ApiError';
import { AuthRequest } from '../auth-request';
import redisClient from '../utils/redisClient';

const userService = new UserService();

export default async function authenticateJWT(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized. No token provided' });
      return;
    }

    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      res.status(401).json({ message: 'Token is blaclisted' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    if (!decoded) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const user = await userService.findOneById(decoded.id);

    if (!user) {
      res.status(401).json({ message: 'Unauthorized. User not found' });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Jwt error: ', error);

    res.status(401).json({
      message: 'Unauthorized. Failed to authenticate token',
    });
  }
}
